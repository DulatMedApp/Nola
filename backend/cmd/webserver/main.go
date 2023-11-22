package main

import (

	// Импорт вашего файла конфигурации

	"log"

	"github.com/DulatMedApp/Nola/backend/cmd/db"
	"github.com/DulatMedApp/Nola/backend/cmd/interntal/handlers"
	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
)

func main() {
	dbInstance, err := db.InitDB()
	if err != nil {
		log.Fatal(err)
	}
	defer dbInstance.Close()

	r := gin.Default()

	//Get from handlers
	handlers.SetupRoutes(r)

	r.Run(":8080")

}
