// backend/internal/handlers/user_credentials_handler.go

package handlers

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/DulatMedApp/Nola/backend/cmd/internal/helpers"
	"github.com/DulatMedApp/Nola/backend/cmd/internal/models"
	"github.com/DulatMedApp/Nola/backend/cmd/internal/repositories"
	"github.com/DulatMedApp/Nola/backend/cmd/internal/sms"
)

func GetAllUsers(w http.ResponseWriter, r *http.Request) {
	db := r.Context().Value("db").(*sql.DB)

	users, err := repositories.GetAllUsers(db)
	if err != nil {
		helpers.RespondJSON(w, "Unable to fetch users", http.StatusInternalServerError)
		return
	}

	helpers.RespondJSON(w, users, http.StatusOK)
}

func VerifySmsCodeHandler(w http.ResponseWriter, r *http.Request) {
	db := r.Context().Value("db").(*sql.DB)

	var ucred models.User_credentials

	err := json.NewDecoder(r.Body).Decode(&ucred)
	if err != nil {
		http.Error(w, "Invalid JSON data", http.StatusBadRequest)
		return
	}

	// Getting sms code from client in request
	clientCode := fmt.Sprintf("%d", ucred.VerificationSmsCode)

	// Getting sms code from DB to compare
	dbCode, id, err := sms.GetVerificationCodeFromDatabase(db, ucred.PhoneNumber)
	if err != nil {
		http.Error(w, "Error fetching verification code from database", http.StatusInternalServerError)
		return
	}

	if clientCode == dbCode {
		data := []map[string]interface{}{
			{"id": id, "verified": "1"},
		}
		err := repositories.UpdateDatabaseValues(db, data)
		if err != nil {
			helpers.RespondJSON(w, "DB records updated unsuccessfully", http.StatusInternalServerError)
			return
		}

		helpers.RespondJSON(w, "Verification code CORRECT", http.StatusOK)
	} else {
		helpers.RespondJSON(w, "Verification code WRONG", http.StatusUnauthorized)
	}
}

func SendSmsUserExistHandler(w http.ResponseWriter, r *http.Request) {

	db := r.Context().Value("db").(*sql.DB)

	var pNumber models.User_credentials

	err := json.NewDecoder(r.Body).Decode(&pNumber)
	if err != nil {
		helpers.RespondJSON(w, "Invalid JSON data", http.StatusBadRequest)
	}

	dbUserExist, err := repositories.CheckUserExist(db, pNumber.PhoneNumber)
	if err != nil {
		helpers.RespondJSON(w, "Error fetching user from database", http.StatusInternalServerError)
		return
	}

	if dbUserExist == 1 {
		verificationCode := sms.GenerateVerificationCode()

		_, err = sms.SendSMS(pNumber.PhoneNumber, fmt.Sprintf("Your verification code is: %s", verificationCode))
		if err != nil {
			helpers.RespondJSON(w, "SMS NOT send to user", http.StatusInternalServerError)
		}
		helpers.RespondJSON(w, "SMS sent to user SUCCESSFULLY", http.StatusOK)
	} else {
		helpers.RespondJSON(w, "No user found with this phone number", http.StatusInternalServerError)
	}

}

// func UpdateUserPassword(w http.ResponseWriter, r *http.Request) {
// 	db := r.Context().Value("db").(*sql.DB)

// 	var user models.User_credentials

// 	err := json.NewDecoder(r.Body).Decode(&user)
// 	if err != nil {
// 		helpers.RespondJSON(w, "Invalid JSON data", http.StatusBadRequest)
// 	}

// 	dbUserUpdate, err := repositories.UpdateUserPassword(db, user.PhoneNumber, user.Password, user.ConfirmedPassword)

// }
