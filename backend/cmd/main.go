package main

import (
	"log"
	"net/http"

	config "github.com/DulatMedApp/Nola/backend/cmd/internal/db"
	"github.com/DulatMedApp/Nola/backend/cmd/internal/routers"
	_ "github.com/go-sql-driver/mysql" // MySQL driver
)

func main() {

	// Connecting to DB
	db, err := config.InitDB()
	if err != nil {
		log.Fatal(err)
	}
	// Closing db connection
	defer db.Close()

	// Создаем маршрутизатор
	r := routers.SetupRouter()

	// Запускаем сервер на порту 8080
	server := &http.Server{
		Addr:    ":8080",
		Handler: r,
	}

	log.Println("Server is running on port 8080")
	err = server.ListenAndServe()
	if err != nil {
		log.Fatal("Server failed to start: ", err)
	}

}
