package main

import (
	"log"
	"net/http"
	"os"

	config "github.com/DulatMedApp/Nola/backend/cmd/internal/db"
	"github.com/DulatMedApp/Nola/backend/cmd/internal/handlers"
	middleware "github.com/DulatMedApp/Nola/backend/cmd/internal/middlewares"
	"github.com/DulatMedApp/Nola/backend/cmd/internal/routers"
	_ "github.com/go-sql-driver/mysql" // MySQL driver
	"github.com/rs/zerolog"
)

func main() {

	// Инициализация zerolog логгера
	logger := zerolog.New(os.Stderr).With().Timestamp().Logger()

	// Установка zerolog как логгера по умолчанию для пакета log
	log.SetFlags(0)
	log.SetOutput(logger)

	//create route that requires authentification via JWT
	http.Handle("/protected", middleware.AuthMiddleware(http.HandlerFunc(handlers.ProtectedHandler)))

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
