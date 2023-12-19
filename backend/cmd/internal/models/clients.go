// backend/internal/models/clients.go

package models

import "time"

type Client struct {
	ID                int        `json:"id"`
	UserCredentialsID *string    `json:"usercredentialsid"` // Тип указателя *string для обработки NULL значений
	Name              string     `json:"name"`
	Surname           string     `json:"surname"`
	PhoneNumber       string     `json:"phone_number"`
	Email             string     `json:"email"`
	Gender            string     `json:"gender"`
	City              string     `json:"city"`
	Password          string     `json:"password"`
	DateOfBirth       string     `json:"date_of_birth"`
	Rating            float64    `json:"raiting"`
	CreatedAt         *time.Time `json:"created_at"` // Тип указателя *time.Time для обработки NULL значений
	UpdatedAt         *time.Time `json:"updated_at"` // Тип указателя *time.Time для обработки NULL значений

}
