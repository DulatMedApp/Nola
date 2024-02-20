package repositories

import (
	"database/sql"
	"fmt"

	"github.com/DulatMedApp/Nola/backend/cmd/internal/models"
)

func CreateNewTesting(db *sql.DB, testing models.Testing) error {

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

	insertQuery := `
	INSERT INTO testing_table ( name, surname, img_url)
	VALUES ( ?, ?, ?)
`

	// Insert new user data into the database
	_, err = tx.Exec(insertQuery, testing.Name, testing.Surname, testing.ImgUrl)
	if err != nil {
		fmt.Println("Error inserting into testing_table table:", err)
		tx.Rollback()
		return err
	}
	//In case of creating NewPsychologist, commit transaction
	err = tx.Commit()
	if err != nil {
		return err
	}

	return nil
}
