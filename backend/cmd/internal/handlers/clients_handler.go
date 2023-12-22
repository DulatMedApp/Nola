// backend/internal/handlers/clients_handler.go

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

func GetAllClient(w http.ResponseWriter, r *http.Request) {
	db := r.Context().Value("db").(*sql.DB)

	//Get id from URL
	clientID := mux.Vars(r)["client_id"]

	client, err := repositories.GetClient(db, clientID)
	if err != nil {
		http.Error(w, fmt.Sprintf("Failed to get client: %v", err), http.StatusInternalServerError)
		return
	}
	helpers.RespondJSON(w, client, http.StatusOK)

}

func UpdateClientHandler(w http.ResponseWriter, r *http.Request) {
	db := r.Context().Value("db").(*sql.DB)

	//Get data from JSON
	var updateData map[string]interface{}
	err := json.NewDecoder(r.Body).Decode(&updateData)
	if err != nil {
		helpers.RespondJSON(w, "Invalid JSON data", http.StatusBadRequest)
		return
	}

	//Get ID from URL
	clientID := mux.Vars(r)["client_id"]

	//Update data in DB
	err = repositories.UpdateClient(db, clientID, updateData)
	if err != nil {
		helpers.RespondJSON(w, "Unable to Update Client", http.StatusInternalServerError)
		return
	}
	helpers.RespondJSON(w, "Client updated successgully", http.StatusOK)

}

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

// DELETE client from DB by ID
func DeleteClientHandler(w http.ResponseWriter, r *http.Request) {
	db := r.Context().Value("db").(*sql.DB)
	// Get id from URL
	clientID := mux.Vars(r)["client_id"]

	err := repositories.DeleteClient(db, clientID)
	if err != nil {
		http.Error(w, fmt.Sprintf("Failed to DELETE CLIENT: %v", err), http.StatusInternalServerError)
		return
	}

	helpers.RespondJSON(w, "Client successfully DELETED", http.StatusOK)
}
