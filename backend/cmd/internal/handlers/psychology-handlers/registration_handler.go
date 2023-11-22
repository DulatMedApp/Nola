package psychology_handlers

import (
	"net/http"

	"github.com/DulatMedApp/Nola/backend/cmd/interntal/models"
	"github.com/gin-gonic/gin"
)

func RegistrationPsychologistHandler(c *gin.Context) {
	var psychologistData models.Psychologist

	//Reading data from JSON request
	if err := c.ShouldBindJSON(&psychologistData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	//Cheking required fields
	if psychologistData.Name == "" || psychologistData.Surname == "" || psychologistData.Email == "" || psychologistData.DataOfBirth == "" || psychologistData.PhoneNumber == "" || psychologistData.WorkExperience == "" || psychologistData.AboutYourself == "" {
		return
	}

	//Processing pshychology registration using service
	registrationService := services.NewRegistrationService()
	err := registrationService.RegisterPsychologist(psychologistData)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOk, gin.H{"message": "Pshychologist successfully registered"})
}
