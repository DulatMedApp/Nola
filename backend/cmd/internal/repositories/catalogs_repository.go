package repositories

import (
	"database/sql"

	"github.com/DulatMedApp/Nola/backend/cmd/internal/models"
)

// Get PsyWorkTopics
func GetPsyWorkTopics(db *sql.DB) ([]models.PsyWorkTopics, error) {
	rows, err := db.Query("SELECT   topic_id,     topic_name from psy_work_topic")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var worktopics []models.PsyWorkTopics

	for rows.Next() {
		var topics models.PsyWorkTopics

		if err := rows.Scan(&topics.ID, &topics.Name); err != nil {
			return nil, err
		}

		worktopics = append(worktopics, topics)
	}

	return worktopics, nil
}

// Get PsyWorkTopics
func GetLanguages(db *sql.DB) ([]models.Languages, error) {
	rows, err := db.Query("SELECT   language_id,     language_name from languages")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var languages []models.Languages

	for rows.Next() {
		var lang models.Languages

		if err := rows.Scan(&lang.ID, &lang.Name); err != nil {
			return nil, err
		}

		languages = append(languages, lang)
	}

	return languages, nil
}

func GetTherapyMethods(db *sql.DB) ([]models.TherapyMethods, error) {
	rows, err := db.Query("SELECT   method_id,     method_name from therapy_methods")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var therapymethods []models.TherapyMethods

	for rows.Next() {
		var methods models.TherapyMethods

		if err := rows.Scan(&methods.ID, &methods.Name); err != nil {
			return nil, err
		}
		therapymethods = append(therapymethods, methods)
	}
	return therapymethods, nil
}
