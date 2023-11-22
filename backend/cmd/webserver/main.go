package main

import (
	"log"
	"net/http"

	"github.com/DulatMedApp/Nola/backend/cmd/db"
	"github.com/DulatMedApp/Nola/backend/cmd/internal/handlers"
	_ "github.com/go-sql-driver/mysql"
)

func main() {
	dbInstance, err := db.InitDB()
	if err != nil {
		log.Fatal(err)
	}
	defer dbInstance.Close()

	// Создание маршрутов без использования Gin
	mux := http.NewServeMux()
	handlers.SetupRoutes(mux)

	// Начало прослушивания порта
	err = http.ListenAndServe(":8080", mux)
	if err != nil {
		log.Fatal(err)
	}
}
