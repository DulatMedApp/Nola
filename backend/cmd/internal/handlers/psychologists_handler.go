// backend/internal/handlers/psychologists_handler.go

package handlers

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"

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
	err = repositories.CreateNewPshychologist(db, psych)
	if err != nil {
		http.Error(w, "Failed to create psychologist", http.StatusInternalServerError)
		return
	}

	// Отправляем успешный статус в ответ на запрос
	w.WriteHeader(http.StatusCreated)
	fmt.Fprintln(w, "Psychologist created successfully")
}

func VerifyCodeHandler(w http.ResponseWriter, r *http.Request) {
	db := r.Context().Value("db").(*sql.DB)

	var psych models.Psychologist

	err := json.NewDecoder(r.Body).Decode(&psych)
	if err != nil {
		http.Error(w, "Invalid JSON data", http.StatusBadRequest)
		return
	}

	// Getting sms code from client in request
	clientCode := fmt.Sprintf("%d", psych.Verification_sms_code)

	// Getting sms code from DB to compare
	dbCode, err := repositories.GetVerificationCodeFromDatabase(db, psych.PhoneNumber)
	if err != nil {
		http.Error(w, "Error fetching verification code from database", http.StatusInternalServerError)
		return
	}

	// Compare sms code from client and DB
	if clientCode == dbCode {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("Verification code CORRECT"))
	} else {
		w.WriteHeader(http.StatusUnauthorized)
		w.Write([]byte("Verification code WRONG"))
	}
}
