// backend/internal/models/psychologist.go

package models

type Psychologist struct {
	ID                    int     `json:"id"`
	Name                  string  `json:"name"`
	Surname               string  `json:"surname"`
	Email                 string  `json:"email"`
	PhoneNumber           string  `json:"phone_number"`
	DateOfBirth           string  `json:"date_of_birth"`
	City                  string  `json:"city"`
	AboutPsychologist     string  `json:"about_psychologist"`
	ExperienceYears       int     `json:"experience_years"`
	Raiting               float64 `json:"raiting"`
	Veryfied              int     `json:"verified"`
	Verification_sms_code int     `json:"verification_sms_code"`
}
