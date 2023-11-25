// backend/internal/repositories/psychologists_repository.go

package repositories

import (
	"database/sql"
	"errors"
	"fmt"
	"strings"

	"github.com/DulatMedApp/Nola/backend/cmd/internal/models"
	"github.com/DulatMedApp/Nola/backend/cmd/internal/sms"
)

// GetAllPsychologists возвращает список всех психологов из базы данных
func GetAllPsychologists(db *sql.DB) ([]models.Psychologist, error) {
	// Выполняем запрос к базе данных для получения списка психологов
	rows, err := db.Query("SELECT id, name, surname, email, date_of_birth, phone_number, about_psychologist, experience_years FROM psychologists")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	// Создаем слайс для хранения результатов
	var psychologists []models.Psychologist

	// Итерируемся по результатам запроса и заполняем слайс с психологами
	for rows.Next() {
		var psych models.Psychologist
		if err := rows.Scan(&psych.ID, &psych.Name, &psych.Surname, &psych.Email, &psych.DateOfBirth, &psych.PhoneNumber, &psych.AboutPsychologist); err != nil {
			return nil, err
		}
		psychologists = append(psychologists, psych)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}

	return psychologists, nil
}

func CreateNewPshychologist(db *sql.DB, psych models.Psychologist) error {

	// Prepare query to insert in DB
	query := "INSERT INTO psychologists(name, surname, email, date_of_birth, phone_number, about_psychologist, experience_years, verification_sms_code) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"

	verificationCode := sms.GenerateVerificationCode()

	_, err := sms.SendSMS(psych.PhoneNumber, fmt.Sprintf("Your verification code is: %s", verificationCode))

	// Теперь выполняем запрос на вставку данных в таблицу
	_, err = db.Exec(query, psych.Name, psych.Surname, psych.Email, psych.DateOfBirth, psych.PhoneNumber, psych.AboutPsychologist, psych.ExperienceYears, verificationCode)
	if err != nil {
		return err
	}

	return nil
}

// GetVerificationCodeFromDatabase возвращает код верификации для указанного номера телефона из базы данных
func GetVerificationCodeFromDatabase(db *sql.DB, phoneNumber string) (string, int, error) {
	var verificationCode string
	var id int

	query := "SELECT id, verification_sms_code FROM psychologists WHERE phone_number = ?"

	row := db.QueryRow(query, phoneNumber)
	err := row.Scan(&id, &verificationCode)
	if err != nil {
		if err == sql.ErrNoRows {
			return "", 0, errors.New("No verification code found for the provided phone number")
		}
		return "", 0, err
	}

	return verificationCode, id, nil
}

// UpdateDatabase обновляет записи в базе данных на основе данных из слайса
func UpdateDatabaseValues(db *sql.DB, data []map[string]interface{}) error {
	if len(data) == 0 {
		return errors.New("Empty data provided")
	}

	// Получаем первую запись в слайсе для извлечения информации о полях
	firstRecord := data[0]

	// Формируем SQL-запрос для обновления
	var updateFields []string
	var updateValues []interface{}

	for key, value := range firstRecord {
		updateFields = append(updateFields, fmt.Sprintf("%s = ?", key))
		updateValues = append(updateValues, value)
	}

	query := fmt.Sprintf("UPDATE psychologists SET %s WHERE id = ?", strings.Join(updateFields, ", "))

	// Обновляем записи в базе данных
	for _, record := range data {
		id := record["id"]

		if id == nil {
			return errors.New("ID is missing in the record")
		}

		var updateArgs []interface{}
		updateArgs = append(updateValues, id)

		_, err := db.Exec(query, updateArgs...)
		if err != nil {
			return err
		}
	}

	return errors.New("Updated Successfully")
}
