// backend/internal/repositories/psychologists_repository.go

package repositories

import (
	"database/sql"
	"fmt"
	"strings"
	"time"

	"github.com/DulatMedApp/Nola/backend/cmd/internal/helpers"
	"github.com/DulatMedApp/Nola/backend/cmd/internal/models"
	"github.com/DulatMedApp/Nola/backend/cmd/internal/sms"
)

// UpdatePsychologist обновляет данные психолога в базе данных по psychologyID на основе переданных данных
func UpdatePsychologist(db *sql.DB, psychologistID string, updateData map[string]interface{}) error {
	// Формируем запрос для обновления
	updateQuery := "UPDATE psychologists SET "
	var values []interface{}

	// Обходим переданные данные для обновления
	for key, value := range updateData {
		updateQuery += fmt.Sprintf("%s=?, ", key)
		values = append(values, value)
	}

	// Убираем последнюю запятую и завершаем формирование запроса
	updateQuery = strings.TrimSuffix(updateQuery, ", ") + " WHERE psychologist_id = ?"
	values = append(values, psychologistID)

	// Подготавливаем запрос обновления
	stmt, err := db.Prepare(updateQuery)
	if err != nil {
		return err
	}
	defer stmt.Close()

	// Выполняем запрос обновления
	_, err = stmt.Exec(values...)
	if err != nil {
		return err
	}

	return nil
}

// Get one from psychology DB
func GetPsychologist(db *sql.DB, psychologyID string) ([]models.Psychologist, error) {
	//request to DB to get one psychology
	rows, err := db.Query("SELECT psychologist_id, user_credentials_id, name, surname, date_of_birth, city, about_psychologist, experience_years, rating, created_at, updated_at FROM psychologists WHERE psychologist_id = ?", psychologyID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	//Create a slice for store result
	var psychology []models.Psychologist

	//Fill slice
	for rows.Next() {
		var psych models.Psychologist
		var createdTime, updatedTime []uint8 // интерфейс для сканирования []uint8 времени из базы данных

		if err := rows.Scan(&psych.ID, &psych.Name, &psych.Surname, &psych.DateOfBirth, &psych.PhoneNumber, &psych.City, &psych.AboutPsychologist, &psych.ExperienceYears, &psych.Rating, &createdTime, &updatedTime); err != nil {
			return nil, err
		}

		// Преобразование []uint8 времени в *time.Time с помощью нашей функции scanTime
		parsedCreatedTime, err := helpers.ScanTime(createdTime)
		if err != nil {
			return nil, err
		}
		parsedUpdatedTime, err := helpers.ScanTime(updatedTime)
		if err != nil {
			return nil, err
		}

		psych.CreatedAt = parsedCreatedTime
		psych.UpdatedAt = parsedUpdatedTime

		psychology = append(psychology, psych)
	}

	return psychology, nil

}

// GetAllPsychologists возвращает список всех психологов из базы данных
func GetAllPsychologists(db *sql.DB) ([]models.Psychologist, error) {
	// Request to DB to get all psychologists
	rows, err := db.Query("SELECT psychologist_id, user_credentials_id, name, surname, date_of_birth, city, about_psychologist, experience_years, rating, created_at, updated_at FROM psychologists")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	// Создаем слайс для хранения результатов
	var psychologists []models.Psychologist

	// Итерируемся по результатам запроса и заполняем слайс с психологами
	for rows.Next() {
		var psych models.Psychologist
		var createdTime, updatedTime []uint8 // интерфейс для сканирования []uint8 времени из базы данных

		if err := rows.Scan(&psych.ID, &psych.Name, &psych.Surname, &psych.DateOfBirth, &psych.PhoneNumber, &psych.City, &psych.AboutPsychologist, &psych.ExperienceYears, &psych.Rating, &createdTime, &updatedTime); err != nil {
			return nil, err
		}

		// Преобразование []uint8 времени в *time.Time с помощью нашей функции scanTime
		parsedCreatedTime, err := helpers.ScanTime(createdTime)
		if err != nil {
			return nil, err
		}
		parsedUpdatedTime, err := helpers.ScanTime(updatedTime)
		if err != nil {
			return nil, err
		}

		psych.CreatedAt = parsedCreatedTime
		psych.UpdatedAt = parsedUpdatedTime

		psychologists = append(psychologists, psych)
	}

	return psychologists, nil
}

func CreateNewPsychologist(db *sql.DB, psych models.Psychologist) error {

	//Begining transaction
	tx, err := db.Begin()
	if err != nil {
		return err
	}

	//Rollback in case of error
	defer func() {
		if r := recover(); r != nil {
			tx.Rollback()
		}
	}()

	// Create a new record in the user_credentials table
	userCredentialsID, err := CreateUserCredentials(tx, psych.Email, psych.PhoneNumber, psych.Password)
	if err != nil {
		return err
	}

	convertedDate, err := helpers.ConvertDateFormat(psych.DateOfBirth)
	if err != nil {
		fmt.Println("Error converting date:", err)
		// Обработайте ошибку
	}

	insertQuery := `
	INSERT INTO psychologists (user_credentials_id, name, surname, date_of_birth, gender, city, about_psychologist, experience_years, get_new_order, consultation_cost, consultation_duration, community_member, rating, initial_reg_complete, created_at, updated_at)
	VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?)
`

	// Insert new user data into the database
	_, err = tx.Exec(insertQuery, userCredentialsID, psych.Name, psych.Surname, convertedDate, psych.Gender, psych.City, psych.AboutPsychologist, psych.ExperienceYears, psych.GetNewOrder, psych.ConsultationCost, psych.ConsultationDuration, psych.CommunityMember, psych.InitialRegComplete, 0.0, time.Now(), time.Now())
	if err != nil {
		fmt.Println("Error inserting into psychologist table:", err)
		tx.Rollback()
		return err
	}

	verificationCode := sms.GenerateVerificationCode()

	_, err = sms.SendSMS(psych.PhoneNumber, fmt.Sprintf("Your verification code is: %s", verificationCode))
	if err != nil {
		return err
	}

	updateQuery := `UPDATE user_credentials SET verification_sms_code = ? WHERE phone_number = ?`
	_, err = tx.Exec(updateQuery, verificationCode, psych.PhoneNumber)

	if err != nil {
		fmt.Println("Error updating sms_verification_code:", err)
		return err
	}

	//In case of creating NewPsychologist, commit transaction
	err = tx.Commit()
	if err != nil {
		return err
	}

	return nil
}
