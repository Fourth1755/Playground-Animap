package controllers

import (
	"anime/go-api/initializers"
	"anime/go-api/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

// get all animes (temp)
func GetAllAnimes(c *gin.Context) {
	animeList := []models.Anime{}
	rows, err := initializers.DB.Table("animes").Select(`animes_id`, `animes_name`, `animes_nameTH`, `animes_trailer`, `animes_episodes`, `animes_score`, `animes_image`, `animes_seasonal`, `animes_year`, `animes_content`, `animes_wallpaper`, `animes_duration`, `animes_studioes`, `animes_streaming`).Rows()
	defer rows.Close()

	for rows.Next() {
		var anime models.Anime
		err = rows.Scan(&anime.Id, &anime.Name, &anime.Name_TH, &anime.Trailer, &anime.Episodes, &anime.Score, &anime.Image, &anime.Seasonal, &anime.Year, &anime.Content, &anime.Wallpaper,
			&anime.Duration, &anime.Studio, &anime.Streaming)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"message": err,
			})
		}
		animeList = append(animeList, anime)
	}

	// c.JSON(http.StatusOK, gin.H{
	// 	"message": animeList,
	// })
	c.JSON(http.StatusOK, animeList)
}

// get anime using animes_id (temp)
func GetAnimeById(c *gin.Context) {
	id := c.Param("id")
	anime := models.Anime{}
	row := initializers.DB.Table("animes").Where("animes_id = ? ", id).Select(`animes_id`, `animes_name`, `animes_nameTH`, `animes_trailer`, `animes_episodes`, `animes_score`, `animes_image`, `animes_seasonal`, `animes_year`, `animes_content`, `animes_wallpaper`, `animes_duration`, `animes_studioes`, `animes_streaming`).Row()
	if err := row.Err(); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": err,
		})
	}
	row.Scan(&anime.Id, &anime.Name, &anime.Name_TH, &anime.Trailer, &anime.Episodes, &anime.Score, &anime.Image, &anime.Seasonal, &anime.Year, &anime.Content, &anime.Wallpaper,
		&anime.Duration, &anime.Studio, &anime.Streaming)

	// c.JSON(http.StatusOK, gin.H{
	// 	"message": anime,
	// })
	c.JSON(http.StatusOK, anime)
}

// create anime receive json -> animes_name, animes_nameTH, animes_year, animes_studio, animes_trailer, animes_episodes, animes_score, animes_image, animes_seasonal, animes_content, animes_wallpaper, animes_duration, animes_streaming
func CreateAnime(c *gin.Context) {
	anime := models.Anime{}
	if err := c.BindJSON(&anime); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": err,
		})
		return
	}

	if err := initializers.DB.Exec("INSERT INTO `animemapdb`.`animes` (`animes_name`, `animes_nameTH`, `animes_year`, `animes_studioes`, `animes_trailer`, `animes_episodes`, `animes_score`, `animes_image`, `animes_seasonal`, `animes_content`, `animes_wallpaper`, `animes_duration`, `animes_streaming`) VALUES ( ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? ) ", anime.Name, anime.Name_TH, anime.Year, anime.Studio, anime.Trailer, anime.Episodes, anime.Score, anime.Image, anime.Seasonal, anime.Content, anime.Wallpaper, anime.Duration, anime.Streaming).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": err,
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Create anime success",
	})

}
