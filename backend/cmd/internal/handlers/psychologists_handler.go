// backend/internal/handlers/psychologists_handler.go

package handlers

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/DulatMedApp/Nola/backend/cmd/internal/helpers"
	"github.com/DulatMedApp/Nola/backend/cmd/internal/models"
	"github.com/DulatMedApp/Nola/backend/cmd/internal/repositories"
	"github.com/gorilla/mux"
	"golang.org/x/crypto/bcrypt"
)

func UpdatePsychologistHandler(w http.ResponseWriter, r *http.Request) {
	db := r.Context().Value("db").(*sql.DB)

	// Извлекаем только те поля, которые пришли в JSON запросе
	var updateData map[string]interface{}
	err := json.NewDecoder(r.Body).Decode(&updateData)
	if err != nil {
		http.Error(w, "Invalid JSON data", http.StatusBadRequest)
		return
	}

	// Get ID from URL
	psychologistID := mux.Vars(r)["psychologist_id"]

	// Обновляем только те поля, которые пришли в JSON запросе
	err = repositories.UpdatePsychologist(db, psychologistID, updateData)
	if err != nil {
		helpers.RespondJSON(w, "Unable to Update psychologist", http.StatusInternalServerError)
		return
	}
	helpers.RespondJSON(w, "Psychologist Updated Successfully", http.StatusOK)
}

func GetPsychologistHandler(w http.ResponseWriter, r *http.Request) {
	db := r.Context().Value("db").(*sql.DB)

	//Get id from URL
	psychologyID := mux.Vars(r)["psychologist_id"]

	psychology, err := repositories.GetPsychologist(db, psychologyID)
	if err != nil {
		http.Error(w, fmt.Sprintf("Failed to get psychologist: %v", err), http.StatusInternalServerError)
		return
	}
	helpers.RespondJSON(w, psychology, http.StatusOK)

}

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
		helpers.RespondJSON(w, "Failed to create psychologist "+err.Error(), http.StatusInternalServerError)
		return
	}

	helpers.RespondJSON(w, "Psychologist created successfully", http.StatusCreated)
}
