// backend/internal/handlers/clients_handler.go

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

// GetAllClients get list of all client from DB
func GetAllClientsHandler(w http.ResponseWriter, r *http.Request) {
	db := r.Context().Value("db").(*sql.DB)

	clients, err := repositories.GetAllClients(db)
	if err != nil {
		helpers.RespondJSON(w, "Unable to fetch CLIENTS", http.StatusInternalServerError)
		return
	}

	helpers.RespondJSON(w, clients, http.StatusOK)

}

func CreateNewClientHandler(w http.ResponseWriter, r *http.Request) {
	db := r.Context().Value("db").(*sql.DB)

	var client models.Client

	err := json.NewDecoder(r.Body).Decode(&client)
	if err != nil {
		helpers.RespondJSON(w, "Invalid JSON data", http.StatusBadRequest)
		return
	}

	//Hash password before saving in DB
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(client.Password), bcrypt.DefaultCost)
	if err != nil {
		helpers.RespondJSON(w, "Failed to hash password", http.StatusInternalServerError)
	}

	client.Password = string(hashedPassword)

	err = repositories.CreateNewClient(db, client)

	if err != nil {
		helpers.RespondJSON(w, "Failed to create client", http.StatusInternalServerError)
		return
	}

	helpers.RespondJSON(w, "Client created successfully", http.StatusCreated)

}
