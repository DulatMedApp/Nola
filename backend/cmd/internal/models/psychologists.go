// backend/internal/models/psychologists.go

package models

import (
	"time"
)

type Psychologist struct {
	ID                   int        `json:"id"`
	UserCredentialsID    int        `json:"usercredentialsid"`
	Name                 string     `json:"name"`
	Surname              string     `json:"surname"`
	DateOfBirth          string     `json:"date_of_birth"`
	Gender               string     `json:"gender"`
	City                 string     `json:"city"`
	AboutPsychologist    string     `json:"about_psychologist"`
	ExperienceYears      int        `json:"experience_years"`
	GetNewOrder          int        `json:"get_new_order"`
	ConsultationCost     int        `json:"consultation_cost"`
	ConsultationDuration int        `json:"consultation_duration"`
	CommunityMember      string     `json:"community_member"`
	Rating               float64    `json:"raiting"`
	InitialRegComplete   int        `json:"initial_reg_complete"`
	CreatedAt            *time.Time `json:"created_at"`
	UpdatedAt            *time.Time `json:"updated_at"`

	Email       string `json:"email"`
	PhoneNumber string `json:"phone_number"`
	Password    string `json:"password"`
}

//Verified             int        `json:"verified"`
//VerificationSmsCode  int        `json:"verification_sms_code"`
