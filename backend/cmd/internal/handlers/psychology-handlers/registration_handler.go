package psychology_handlers

import (
	"encoding/json"
	"net/http"

	"github.com/DulatMedApp/Nola/backend/cmd/internal/models"
	service "github.com/DulatMedApp/Nola/backend/cmd/internal/services/pshychology/work"
)

func RegistrationPsychologistHandler(w http.ResponseWriter, r *http.Request) {
	var psychologistData models.Psychologist

	// Чтение данных из JSON-запроса
	err := json.NewDecoder(r.Body).Decode(&psychologistData)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Проверка обязательных полей
	if psychologistData.Name == "" || psychologistData.Surname == "" || psychologistData.Email == "" || psychologistData.DateOfBirth == "" || psychologistData.PhoneNumber == "" || psychologistData.WorkExperience == "" || psychologistData.AboutYourself == "" {
		http.Error(w, "All fields must be filled", http.StatusBadRequest)
		return
	}

	// Обработка регистрации психолога с использованием сервиса
	registrationService := service.NewRegistrationService()
	err = registrationService.RegisterPsychologist(psychologistData)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"message": "Psychologist successfully registered"})
}
