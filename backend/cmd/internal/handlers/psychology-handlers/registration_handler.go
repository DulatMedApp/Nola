package handlers

import (
	"encoding/json"
	"net/http"
)

// RegistrationHandler обрабатывает запросы для /api/name
func RegistrationHandler(w http.ResponseWriter, r *http.Request) {
	// Парсинг данных из JSON тела запроса
	var requestData struct {
		Name string `json:"name"`
	}

	err := json.NewDecoder(r.Body).Decode(&requestData)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Добавление вашей логики обработки данных

	// Возвращение успешного ответа
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"message": "Received name: " + requestData.Name})
}
