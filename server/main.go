package main

import (
	"anime/go-api/controllers"
	"anime/go-api/initializers"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func init() {
	initializers.LoadEnvVariables()
	initializers.ConnectToDb()
}

func main() {
	r := gin.Default()
	r.Use(cors.Default())

	// anime table
	r.GET("/getAllAnimes", controllers.GetAllAnimes)
	r.GET("/getAnimeById/:id", controllers.GetAnimeById)
	//r.POST("/createAnime", middleware.RequireAuth, controllers.CreateAnime)

	r.Run(os.Getenv("PORT"))
}
