// backend/internal/repositories/user_credentials_repository.go

package repositories

import (
	"database/sql"
	"errors"
	"fmt"
	"strings"
	"time"
)

func CheckUserExist(db *sql.DB, phoneNumber string) (int64, error) {
	query := "SELECT COUNT(*) FROM user_credentials WHERE phone_number = ?"
	var count int

	err := db.QueryRow(query, phoneNumber).Scan(&count)

	if err != nil {
		return 0, err
	}
	if count > 0 {
		return 1, err
	} else {
		return 0, err
	}

}

func CreateUserCredentials(tx *sql.Tx, email, phoneNumber, password string) (int64, error) {

	// Check if the email or phone number already exists
	query := "SELECT COUNT(*) FROM user_credentials WHERE email = ? OR phone_number = ?"
	var count int
	err := tx.QueryRow(query, email, phoneNumber).Scan(&count)
	if err != nil {
		return 0, err
	}
	if count > 0 {
		return 0, errors.New("User with this email or phone number already exists")
	}

	verified := 0
	userCredentialsInsert := "INSERT INTO user_credentials ( phone_number, email, password, sms_send_time, role, verified, created_at, updated_at) VALUES (?,?, ?, ?, ?, ?,?, ?)"
	createdAt := time.Now()
	updatedAt := time.Now()
	sms_send_time := time.Now()
	role := "specialist"
	result, err := tx.Exec(userCredentialsInsert, phoneNumber, email, password, sms_send_time, role, verified, createdAt, updatedAt)

	if err != nil {
		tx.Rollback()
		return 0, err
	}

	userCredentialsID, err := result.LastInsertId()
	if err != nil {
		return 0, err
	}

	return userCredentialsID, nil
}

// UpdateDatabaseValues обновляет записи в базе данных на основе данных из слайса
func UpdateDatabaseValues(db *sql.DB, data []map[string]interface{}) error {
	if len(data) == 0 {
		return errors.New("Empty data provided")
	}

	// Получаем первую запись в слайсе для извлечения информации о полях
	firstRecord := data[0]

	// Формируем SQL-запрос для обновления
	var updateFields []string
	var updateArgs []interface{}

	for key, value := range firstRecord {
		if key == "id" {
			continue // Исключаем поле ID из обновления
		}
		updateFields = append(updateFields, fmt.Sprintf("%s = ?", key))
		updateArgs = append(updateArgs, value)
	}

	query := fmt.Sprintf("UPDATE user_credentials SET %s WHERE user_id = ?", strings.Join(updateFields, ", "))

	// Обновляем записи в базе данных
	for _, record := range data {
		id := record["id"]

		if id == nil {
			return errors.New("ID is missing in the record")
		}

		updateArgs = append(updateArgs, id)

		_, err := db.Exec(query, updateArgs...)
		if err != nil {
			return err
		}

		// Сбрасываем аргументы обновления для следующей итерации
		updateArgs = updateArgs[:len(updateFields)]
	}

	return nil
}
