// backend/internal/models/psychologists.go

package models

import "time"

type Psychologist struct {
	ID                  int        `json:"id"`
	Name                string     `json:"name"`
	Surname             string     `json:"surname"`
	Email               string     `json:"email"`
	UserCredentialsID   *string    `json:"usercredentialsid"` // Тип указателя *string для обработки NULL значений
	PhoneNumber         string     `json:"phone_number"`
	Password            string     `json:"password"`
	DateOfBirth         string     `json:"date_of_birth"`
	City                string     `json:"city"`
	AboutPsychologist   string     `json:"about_psychologist"`
	ExperienceYears     int        `json:"experience_years"`
	Verified            int        `json:"verified"`
	VerificationSmsCode int        `json:"verification_sms_code"`
	Rating              float64    `json:"raiting"`    // исправлено на правильное имя поля
	CreatedAt           *time.Time `json:"created_at"` // Тип указателя *time.Time для обработки NULL значений
	UpdatedAt           *time.Time `json:"updated_at"` // Тип указателя *time.Time для обработки NULL значений
}
