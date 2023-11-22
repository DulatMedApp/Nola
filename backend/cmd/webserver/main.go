package main

import (
	"log"
	"net/http"

	"github.com/DulatMedApp/Nola/backend/cmd/db"
	"github.com/DulatMedApp/Nola/backend/cmd/internal/handlers"
	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/mux"
)

func main() {
	dbInstance, err := db.InitDB()
	if err != nil {
		log.Fatal(err)
	}
	defer dbInstance.Close()

	r := mux.NewRouter()
	// Регистрация обработчиков маршрутов
	handlers.RegisterHandlers(r)
	// Запуск сервера на порте :8080
	log.Fatal(http.ListenAndServe(":8080", r))

}
