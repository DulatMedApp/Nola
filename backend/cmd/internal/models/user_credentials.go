// backend/internal/models/user_credentials.go

package models

import "time"

type User_credentials struct {
	ID                    int       `json:"id"`
	Phone_number          string    `json:"phone_number"`
	Email                 string    `json:"email"`
	Password              string    `json:"password"`
	Verification_sms_code int       `json:"verification_sms_code"`
	Sms_send_time         time.Time `json:"sms_send_time"`
	Created_at            time.Time `json:"created_at"`
	Updated_at            time.Time `json:"updated_at"`
	Verified              int       `json:"verified"`
}
