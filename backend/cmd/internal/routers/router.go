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

	//Route when forget password
	r.HandleFunc("api/forgot-password", handlers.UserForgotPassword).Methods(http.MethodPost)

	return r
}
