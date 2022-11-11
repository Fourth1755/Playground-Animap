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

	// studioes table
	r.GET("/getAllStudioes", controllers.GetAllStudioes)
	r.GET("/getStudioById/:id", controllers.GetStudioById)
	r.GET("/getStudioByStudioName/:name", controllers.GetStudioByStudioName)

	// tag table
	r.GET("/getAllTags", controllers.GetAllTags)
	r.GET("/getTagById/:id", controllers.GetTagById)
	//r.POST("/createTag", middleware.RequireAuth, controllers.CreateTag)
	//r.PUT("/updateTag/:id", middleware.RequireAuth, controllers.UpdateTag)

	// tag detail table
	r.GET("/getAllTagDetails", controllers.GetAllTagDetails)
	//r.POST("/createTagDetail", middleware.RequireAuth, controllers.CreateTagDetail)
	r.GET("/getAnimeByTag/:id", controllers.GetAnimesByTagId)
	r.GET("/getTagsByAnime/:id", controllers.GetTagsByAnimesId)

	r.Run(os.Getenv("PORT"))
}
