package auth

import (
	"database/sql"
	"errors"
	"fmt"
	"time"

	"github.com/dgrijalva/jwt-go"
	"golang.org/x/crypto/bcrypt"
)

var jwtKey = []byte("JaTG86awhi69/ft38TnWJz4u78kaw0had6Ra9Po2TMfeoxfvhWKnE7FUdqMXrUAJHmv1F0S1flpQLwl2HPfUlg==")

// Authenticate users
func Authenticate(db *sql.DB, phoneNumber, password string) (string, error) {

	// Checking in DB
	var storedPasswordHash string
	err := db.QueryRow("SELECT password FROM user_credentials WHERE phone_number = ?", phoneNumber).Scan(&storedPasswordHash)
	if err != nil {
		fmt.Println("Error fetching password hash from DB:", err)
		return "", errors.New("invalid credentials")
	}

	// Compare password with hashed password in DB
	err = bcrypt.CompareHashAndPassword([]byte(storedPasswordHash), []byte(password))
	if err != nil {
		fmt.Println("Error comparing password hash:", err)
		return "", errors.New("invalid credentials")
	}

	// Create a token
	token := jwt.New(jwt.SigningMethodHS256)

	// Claims for token
	claims := token.Claims.(jwt.MapClaims)
	claims["phone_number"] = phoneNumber

	// Token lifecycle
	claims["exp"] = time.Now().Add(time.Hour * 24).Unix()

	// Sign a token
	tokenString, err := token.SignedString(jwtKey)
	if err != nil {
		fmt.Println("Error signing the token:", err)
		return "", err
	}

	return tokenString, nil
}
