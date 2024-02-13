package handlers

import (
	"database/sql"
	"net/http"

	"github.com/DulatMedApp/Nola/backend/cmd/internal/helpers"
	"github.com/DulatMedApp/Nola/backend/cmd/internal/repositories"
)

func GetPsyWorkTopics(w http.ResponseWriter, r *http.Request) {

	db := r.Context().Value("db").(*sql.DB)
	worktopics, err := repositories.GetPsyWorkTopics(db)
	if err != nil {
		helpers.RespondJSON(w, "Unable to fetch WorkTopics", http.StatusInternalServerError)
		return
	}

	helpers.RespondJSON(w, worktopics, http.StatusOK)
}

func GetLanguages(w http.ResponseWriter, r *http.Request) {
	db := r.Context().Value("db").(*sql.DB)
	languages, err := repositories.GetLanguages(db)
	if err != nil {
		helpers.RespondJSON(w, "Unable to fetch Languages", http.StatusInternalServerError)
		return
	}
	helpers.RespondJSON(w, languages, http.StatusOK)
}

func GetTherapyMethods(w http.ResponseWriter, r *http.Request) {
	db := r.Context().Value("db").(*sql.DB)
	therapymethods, err := repositories.GetTherapyMethods(db)
	if err != nil {
		helpers.RespondJSON(w, "Unable to fetch Therapy Methos", http.StatusInternalServerError)
		return
	}
	helpers.RespondJSON(w, therapymethods, http.StatusOK)
}
