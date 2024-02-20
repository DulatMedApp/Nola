package handlers

import (
	"database/sql"
	"encoding/json"
	"net/http"

	"github.com/DulatMedApp/Nola/backend/cmd/internal/helpers"
	"github.com/DulatMedApp/Nola/backend/cmd/internal/models"
	"github.com/DulatMedApp/Nola/backend/cmd/internal/repositories"
)

func CreateNewTestingHandler(w http.ResponseWriter, r *http.Request) {
	db := r.Context().Value("db").(*sql.DB)

	var testing models.Testing

	err := json.NewDecoder(r.Body).Decode(&testing)
	if err != nil {
		http.Error(w, "Invalid JSON data", http.StatusBadRequest)
		return
	}

	// Вызываем функцию создания нового психолога в базе данных
	err = repositories.CreateNewTesting(db, testing)

	if err != nil {
		helpers.RespondJSON(w, "Failed to create testing", http.StatusInternalServerError)
		return
	}

	helpers.RespondJSON(w, "Psychologist created testing", http.StatusCreated)
}
