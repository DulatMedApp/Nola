package handlers

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/DulatMedApp/Nola/backend/cmd/internal/auth"
	"github.com/DulatMedApp/Nola/backend/cmd/internal/models"
)

func LoginHandler(w http.ResponseWriter, r *http.Request) {

	db := r.Context().Value("db").(*sql.DB)
	var user models.User_credentials
	err := json.NewDecoder(r.Body).Decode(&user)

	if err != nil {
		http.Error(w, "Invalid JSON data", http.StatusBadRequest)
		return
	}

	phoneNumber := user.PhoneNumber

	password := user.Password

	tokenString, err := auth.Authenticate(db, phoneNumber, password)

	if err != nil {
		// Обработка ошибки аутентификации, например, отправка сообщения об ошибке пользователю
		http.Error(w, "Authentication failed", http.StatusUnauthorized)
		return
	}

	// Если аутентификация прошла успешно, создаем и отправляем токен пользователю
	// Это может включать установку токена в куки, передачу его в заголовке ответа или еще какой-то способ
	w.Header().Set("Authorization", "Bearer "+tokenString)
	// Отправка успешного ответа
	w.WriteHeader(http.StatusOK)
	fmt.Fprintf(w, "Login successful")
}
