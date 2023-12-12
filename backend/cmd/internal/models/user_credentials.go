// backend/internal/models/user_credentials.go

package models

import "time"

type User_credentials struct {
	ID                  int        `json:"id"`
	PhoneNumber         string     `json:"phone_number"`
	Email               string     `json:"email"`
	Password            string     `json:"password"`
	ConfirmedPassword   string     `json:"confirmed_password"`
	VerificationSmsCode int        `json:"verification_sms_code"`
	SmsSendTime         time.Time  `json:"sms_send_time"`
	Role                string     `json:"role"`
	CreatedAt           *time.Time `json:"created_at"`
	UpdatedAt           *time.Time `json:"updated_at"`
	Verified            int        `json:"verified"`
}
