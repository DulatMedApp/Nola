// backend/internal/models/testing.go

package models

type Testing struct {
	ID      int    `json:"id"`
	Name    string `json:"name"`
	Surname string `json:"surname"`
	ImgUrl  string `json:"img_url"`
}
