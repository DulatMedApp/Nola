package handlers

import (
	"net/http"

	"github.com/DulatMedApp/Nola/backend/cmd/internal/helpers"
	"github.com/dgrijalva/jwt-go"
)

func ProtectedHandler(w http.ResponseWriter, r *http.Request) {
	token := r.Context().Value("user").(*jwt.Token)
	claims := token.Claims.(jwt.MapClaims)
	phoneNumber := claims["phone_number"].(string)

	response := map[string]interface{}{
		"message": "Protected resource accessed by user with phone number: " + phoneNumber,
	}
	helpers.RespondJSON(w, response, http.StatusOK)
}
