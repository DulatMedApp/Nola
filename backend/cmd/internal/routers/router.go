// backend/internal/routers/router.go

package routers

import (
	"net/http"

	"github.com/DulatMedApp/Nola/backend/cmd/internal/handlers"
	middleware "github.com/DulatMedApp/Nola/backend/cmd/internal/middlewares"
	"github.com/gorilla/mux"
)

// SetupRouter устанавливает маршруты для API
func SetupRouter() *mux.Router {
	r := mux.NewRouter()

	// Применяем DBMiddleware ко всем маршрутам, где нужно использовать базу данных
	r.Use(middleware.DBMiddleware)

	// Маршрут для получения списка психологов в формате JSON
	r.HandleFunc("/api/psychologists/all", handlers.GetAllPsychologistsHandler).Methods(http.MethodGet)

	// Route for create a new psychologist
	r.HandleFunc("/api/pshychologist/create", handlers.CreateNewPshychologistHandler).Methods(http.MethodPost)

	//Route for check sms verification
	r.HandleFunc("/api/verify-sms-code", handlers.VerifySmsCodeHandler).Methods(http.MethodPost)

	//Route for send SMS if user exist
	r.HandleFunc("/api/send-sms/user-exist", handlers.SendSmsUserExistHandler).Methods(http.MethodPost)

	//Route to get all users
	r.HandleFunc("/api/users/all", handlers.GetAllUsers).Methods(http.MethodGet)

	//Route for create a new client
	r.HandleFunc("/api/client/create", handlers.CreateNewClientHandler).Methods(http.MethodPost)

	// Route for get all clients
	r.HandleFunc("/api/clients/all", handlers.GetAllClientsHandler).Methods(http.MethodGet)

	// //Route for update user password
	// r.HandleFunc("/api/update/user", handlers.UpdateUserPassword).Methods(http.MethodPost)

	return r
}
