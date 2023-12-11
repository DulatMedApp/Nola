// backend/internal/repositories/user_credentials_repository.go

package repositories

import (
	"database/sql"
	"time"
)

func CreateUserCredentials(db *sql.DB, phoneNumber, password string) (int64, error) {
	userCredentialsInsert := "INSERT INTO user_credentials (phone_number, password, created_at, updated_at, verified) VALUES (?, ?, ?, ?, ?)"
	createdAt := time.Now()
	updatedAt := time.Now()
	verified := 0
	result, err := db.Exec(userCredentialsInsert, phoneNumber, password, createdAt, updatedAt, verified)

	if err != nil {
		return 0, err
	}

	userCredentialsID, err := result.LastInsertId()
	if err != nil {
		return 0, err
	}

	return userCredentialsID, nil
}
