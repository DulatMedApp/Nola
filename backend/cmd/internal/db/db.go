package config

import (
	"database/sql"
	"fmt"

	configs "github.com/DulatMedApp/Nola/backend/cmd/internal/configs"
	_ "github.com/go-sql-driver/mysql"
)

var db *sql.DB

// InitDB открывает соединение с базой данных и возвращает объект DB
func InitDB() (*sql.DB, error) {
	connectionString := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", configs.DBUser, configs.DBPassword, configs.DBHost, configs.DBPort, configs.DBDatabase)
	db, err := sql.Open("mysql", connectionString)
	if err != nil {
		return nil, err
	}

	err = db.Ping()
	if err != nil {
		return nil, err
	}

	fmt.Println("Успешное подключение к базе данных!")

	return db, nil
}
