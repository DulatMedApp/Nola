// backend/internal/repositories/user_credentials_repository.go

package repositories

import (
	"database/sql"
	"errors"
	"fmt"
	"time"

	"github.com/DulatMedApp/Nola/backend/cmd/internal/sms"
)

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

	verificationCode := sms.GenerateVerificationCode()

	_, err = sms.SendSMS(phoneNumber, fmt.Sprintf("Your verification code is: %s", verificationCode))
	if err != nil {
		return 0, err
	}

	verified := 0
	userCredentialsInsert := "INSERT INTO user_credentials ( phone_number, email, password, sms_send_time, verified, created_at, updated_at) VALUES (?,?, ?, ?, ?, ?,?)"
	createdAt := time.Now()
	updatedAt := time.Now()
	sms_send_time := time.Now()
	result, err := tx.Exec(userCredentialsInsert, phoneNumber, email, password, sms_send_time, verified, createdAt, updatedAt)

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
