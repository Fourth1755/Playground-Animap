package main

import (
	"anime/go-api/controllers"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	r.Use(cors.Default())

	// anime table
	r.GET("/getAllAnimes", controllers.GetAllAnimes)
	r.GET("/getAnimeById/:id", controllers.GetAnimeById)
	//r.POST("/createAnime", middleware.RequireAuth, controllers.CreateAnime)

	r.Run(os.Getenv("PORT"))
}
