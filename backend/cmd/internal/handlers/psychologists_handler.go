// backend/internal/handlers/psychologists_handler.go

package handlers

import (
	"database/sql"
	"encoding/json"
	"net/http"

	"github.com/DulatMedApp/Nola/backend/cmd/internal/helpers"
	"github.com/DulatMedApp/Nola/backend/cmd/internal/models"
	"github.com/DulatMedApp/Nola/backend/cmd/internal/repositories"
	"golang.org/x/crypto/bcrypt"
)

func GetAllPsychologistsHandler(w http.ResponseWriter, r *http.Request) {

	db := r.Context().Value("db").(*sql.DB)

	psychologists, err := repositories.GetAllPsychologists(db)
	if err != nil {
		helpers.RespondJSON(w, "Unable to fetch psychologists", http.StatusInternalServerError)
		return
	}

	helpers.RespondJSON(w, psychologists, http.StatusOK)
}

func CreateNewPshychologistHandler(w http.ResponseWriter, r *http.Request) {
	db := r.Context().Value("db").(*sql.DB)

	var psych models.Psychologist

	err := json.NewDecoder(r.Body).Decode(&psych)
	if err != nil {
		http.Error(w, "Invalid JSON data", http.StatusBadRequest)
		return
	}

	//Hash password before saving in DB
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(psych.Password), bcrypt.DefaultCost)
	if err != nil {
		helpers.RespondJSON(w, "Failed to hash password", http.StatusInternalServerError)
	}

	psych.Password = string(hashedPassword)

	// Вызываем функцию создания нового психолога в базе данных
	err = repositories.CreateNewPsychologist(db, psych)

	if err != nil {
		helpers.RespondJSON(w, "Failed to create psychologist", http.StatusInternalServerError)
		return
	}

	helpers.RespondJSON(w, "Psychologist created successfully", http.StatusCreated)
}
