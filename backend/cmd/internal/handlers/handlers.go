package handlers

import (
	"net/http"

	psychology_handlers "github.com/DulatMedApp/Nola/backend/cmd/internal/handlers/psychology-handlers"
)

func SetupRoutes() http.Handler {
	mux := http.NewServeMux()

	// example handlers for /psychology/work
	mux.HandleFunc("/psychology/work/registartion", psychology_handlers.RegistrationPsychologistHandler)

	return mux
}
