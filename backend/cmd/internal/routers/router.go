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

	/*psychologist routers-----------------------------------*/

	// Маршрут для получения списка психологов в формате JSON
	r.HandleFunc("/api/psychologists/all", handlers.GetAllPsychologistsHandler).Methods(http.MethodGet)

	// Route for create a new psychologist
	r.HandleFunc("/api/pshychologist/create", handlers.CreateNewPshychologistHandler).Methods(http.MethodPost)

	//Route for get one psychologists
	r.HandleFunc("/api/psychologist/{psychologist_id}", handlers.GetPsychologistHandler).Methods(http.MethodGet)

	//Route for update psychologist
	r.HandleFunc("/api/psychologist/update/{psychologist_id}", handlers.UpdatePsychologistHandler).Methods(http.MethodPut)

	/*end of psychologist routers----------------------------*/

	/*clients routers-----------------------------------------*/

	//Route for CREATE a new CLIENT
	r.HandleFunc("/api/client/create", handlers.CreateNewClientHandler).Methods(http.MethodPost)

	// Route for DELETE CLIENT
	r.HandleFunc("/api/client/{client_id}", handlers.DeleteClientHandler).Methods(http.MethodDelete)

	// Route for GET all CLIENTS
	r.HandleFunc("/api/clients/all", handlers.GetAllClientsHandler).Methods(http.MethodGet)

	// Route for GET one client
	// r.HandleFunc("/api/client/{client_id}", handlers.GetClientHandler).Methods(http.MethodGet)

	// Route for UPDATE client
	r.HandleFunc("/api/client/update/{client_id}", handlers.UpdateClientHandler).Methods(http.MethodPut)

	/*end of clients routers-----------------------------------*/

	/*users routers-----------------------------------------*/

	//Route to get all users
	r.HandleFunc("/api/users/all", handlers.GetAllUsers).Methods(http.MethodGet)

	/*end of users routers-----------------------------------*/

	/*sms routers-----------------------------------------*/

	//Route for check sms verification
	r.HandleFunc("/api/verify-sms-code", handlers.VerifySmsCodeHandler).Methods(http.MethodPost)

	//Route for send SMS if user exist
	r.HandleFunc("/api/send-sms/user-exist", handlers.SendSmsUserExistHandler).Methods(http.MethodPost)

	/*end of sms routers-----------------------------------*/

	//Route for authentification and get token
	r.HandleFunc("/api/login", handlers.LoginHandler).Methods(http.MethodPost)

	// //Route for update user password
	// r.HandleFunc("/api/update/user", handlers.UpdateUserPassword).Methods(http.MethodPost)

	return r
}
