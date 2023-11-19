package main

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/go-sql-driver/mysql"
	"github.com/yourusername/yourproject/configs" // Импорт вашего файла конфигурации
)

func main() {
	// Формирование строки подключения к базе данных
	connectionString := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", configs.DBUser, configs.DBPassword, configs.DBHost, configs.DBPort, configs.DBDatabase)

	// Подключение к базе данных
	db, err := sql.Open("mysql", connectionString)
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	// Попытка установления соединения с базой данных
	err = db.Ping()
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Успешное подключение к базе данных!")
}
