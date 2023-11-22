package models

type Psychologist struct {
	Name           string `json: "name"`
	Surname        string `json: "surname"`
	Email          string `json: "email"`
	DataOfBirth    string `json: "data_of_birth"`
	PhoneNumber    string `json: "phone_number"`
	WorkExperience string `json: "work_experience"`
	AboutYourself  string `json: "about_yourself"`
}
