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

	handler := corsHandler(r)

	//Запускаем сервер на порту 8080
	server := &http.Server{
		Addr:    ":8080",
		Handler: handler,
	}

	log.Println("Server is running on port 8080")
	err = server.ListenAndServe()
	if err != nil {
		log.Fatal("Server failed to start: ", err)
	}

}

// corsHandler добавляет middleware для CORS к маршрутизатору
func corsHandler(h http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Разрешаем доступ к API с указанных доменов
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		// Если запрос метода OPTIONS, завершаем обработку запроса
		if r.Method == "OPTIONS" {
			return
		}

		// Продолжаем обработку запроса
		h.ServeHTTP(w, r)
	})
}
