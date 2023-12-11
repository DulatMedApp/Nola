// backend/internal/repositories/psychologists_repository.go

package repositories

import (
	"database/sql"
	"fmt"
	"time"

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
	// for rows.Next() {
	// 	var psych models.Psychologist
	// 	if err := rows.Scan(&psych.ID, &psych.Name, &psych.Surname, &psych.Email, &psych.DateOfBirth, &psych.PhoneNumber, &psych.AboutPsychologist); err != nil {
	// 		return nil, err
	// 	}
	// 	psychologists = append(psychologists, psych)
	// }
	if err := rows.Err(); err != nil {
		return nil, err
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
	userCredentialsID, err := CreateUserCredentials(tx, psych.Email, psych.PhoneNumber, "hashed_password_here") // Replace "hashed_password_here" with the hashed password
	if err != nil {
		fmt.Println("Error creating user credentials:", err)
		return err
	}

	insertQuery := `
	INSERT INTO psychologists (user_credentials_id, name, surname, date_of_birth, city, about_psychologist, experience_years, raiting, created_time, updated_time)
	VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`

	// Insert new user data into the database
	_, err = tx.Exec(insertQuery, userCredentialsID, psych.Name, psych.Surname, psych.DateOfBirth, psych.City, psych.AboutPsychologist, psych.ExperienceYears, 0.0, time.Now(), time.Now())
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
