package sms

import (
	"database/sql"
	"errors"
	"math/rand"
)

const (
	codeLenth = 6
)

//GenerateVerificationCode

func GenerateVerificationCode() string {
	//rand.Seed(time.Now().UnixNano())

	codeRunes := []rune("0123456789")

	code := make([]rune, codeLenth)
	for i := range code {
		code[i] = codeRunes[rand.Intn(len(codeRunes))]
	}
	return string(code)
}

// GetVerificationCodeFromDatabase возвращает код верификации для указанного номера телефона из базы данных
func GetVerificationCodeFromDatabase(db *sql.DB, phoneNumber string) (string, int, error) {
	var verificationCode string
	var id int

	query := "SELECT user_id, verification_sms_code FROM user_credentials WHERE phone_number = ?"

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
