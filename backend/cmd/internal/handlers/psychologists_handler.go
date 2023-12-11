// backend/internal/handlers/psychologists_handler.go

package handlers

import (
	"database/sql"
	"encoding/json"
	"net/http"

	"github.com/DulatMedApp/Nola/backend/cmd/internal/helpers"
	"github.com/DulatMedApp/Nola/backend/cmd/internal/models"
	"github.com/DulatMedApp/Nola/backend/cmd/internal/repositories"
)

func GetAllPsychologistsHandler(w http.ResponseWriter, r *http.Request) {

	db := r.Context().Value("db").(*sql.DB)

	psychologists, err := repositories.GetAllPsychologists(db)
	if err != nil {
		http.Error(w, "Unable to fetch psychologists", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(psychologists); err != nil {
		http.Error(w, "Failed to encode psychologists data", http.StatusInternalServerError)
		return
	}
}

func CreateNewPshychologistHandler(w http.ResponseWriter, r *http.Request) {
	db := r.Context().Value("db").(*sql.DB)

	var psych models.Psychologist

	err := json.NewDecoder(r.Body).Decode(&psych)
	if err != nil {
		http.Error(w, "Invalid JSON data", http.StatusBadRequest)
		return
	}

	// Вызываем функцию создания нового психолога в базе данных
	err = repositories.CreateNewPsychologist(db, psych)

	if err != nil {
		helpers.RespondJSON(w, "Failed to create psychologist", http.StatusInternalServerError)
		return
	}

	helpers.RespondJSON(w, "Psychologist created successfully", http.StatusCreated)
}
