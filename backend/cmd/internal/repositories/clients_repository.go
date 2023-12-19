package repositories

import (
	"database/sql"
	"fmt"
	"log"
	"time"

	"github.com/DulatMedApp/Nola/backend/cmd/internal/helpers"
	"github.com/DulatMedApp/Nola/backend/cmd/internal/models"
	"github.com/DulatMedApp/Nola/backend/cmd/internal/sms"
)

// GetAllClient get list of all client from DB
func GetAllClients(db *sql.DB) ([]models.Client, error) {

	//Request to DB to get all clients
	rows, err := db.Query("SELECT client_id, user_credentials_id, name, surname, gender, date_of_birth, city, rating, created_at, updated_at FROM clients")
	if err != nil {
		log.Println("Ошибка при выполнении запроса: ", err)
		return nil, err
	}

	defer rows.Close()

	//Create slice for store a results
	var clients []models.Client

	//Fill client slice
	for rows.Next() {
		var client models.Client
		var createdTime, updatedTime []uint8

		if err := rows.Scan(&client.ID, &client.UserCredentialsID, &client.Name, &client.Surname, &client.Gender, &client.DateOfBirth, &client.City, &client.Rating, &createdTime, &updatedTime); err != nil {
			log.Println("Ошибка при выполнении запроса: ", err)
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

		client.CreatedAt = parsedCreatedTime
		client.UpdatedAt = parsedUpdatedTime

		clients = append(clients, client)
	}
	return clients, nil
}

// CreateNewClient function for create a ne Psycholists
func CreateNewClient(db *sql.DB, client models.Client) error {

	// Begining transaction
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
	userCredentialsID, err := CreateUserCredentials(tx, client.Email, client.PhoneNumber, client.Password)
	if err != nil {
		return err
	}

	insertQuery := `
	INSERT INTO clients (user_credentials_id, name, surname,  gender, date_of_birth, city, raiting, created_at, updated_at)
	VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
	`

	//Insert new client data into the database
	_, err = tx.Exec(insertQuery, userCredentialsID, client.Name, client.Surname, client.Gender, client.DateOfBirth, client.City, 0.0, time.Now(), time.Now())
	if err != nil {
		fmt.Println("Error inserting into psychologist table:", err)
		tx.Rollback()
		return err
	}

	verificationCode := sms.GenerateVerificationCode()

	_, err = sms.SendSMS(client.PhoneNumber, fmt.Sprintf("Ваш код проверка Nola: %s", verificationCode))
	if err != nil {
		return err
	}

	updateQuery := `UPDATE user_credentials SET verification_sms_code = ? WHERE phone_number = ?`
	_, err = tx.Exec(updateQuery, verificationCode, client.PhoneNumber)

	if err != nil {
		return err
	}

	//In case of creating NewClient, commit transaction
	err = tx.Commit()
	if err != nil {
		return err
	}
	return err
}
