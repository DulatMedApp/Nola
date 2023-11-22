package handlers

import (
	"github.com/gorilla/mux"
)

// RegisterHandlers регистрирует обработчики маршрутов
func RegisterHandlers(r *mux.Router) {
	r.HandleFunc("/api/name", RegistrationHandler).Methods("POST")
}
