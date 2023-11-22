package handlers

import (
	"github.com/gin-gonic/gin"
)

func SetupRoutes(router *gin.Engine) {
	//example handlers for /psychology/work
	router.GET("/psychology/work/registartion", RegistrationPsychologistHandler)
}
