package controllers

import (
	"anime/go-api/initializers"
	"anime/go-api/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

// temp check all tagdetails
func GetAllTagDetails(c *gin.Context) {
	tagdetailList := []models.TagDetail{}
	//select `tagDetails_id`, `tagDetails_tags_id`, `tagDetails_animes_id` from animemapdb.tagdetails
	rows, err := initializers.DB.Table("tagdetails").Select(`tagDetails_id`, `tagDetails_tags_id`, `tagDetails_animes_id`).Rows()
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": err,
		})
		return
	}

	for rows.Next() {
		var detail models.TagDetail
		err = rows.Scan(&detail.Id, &detail.Tag_id, &detail.Anime_id)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"message": err,
			})
		}
		tagdetailList = append(tagdetailList, detail)
	}

	// c.JSON(http.StatusOK, gin.H{
	// 	"message": tagdetailList,
	// })
	c.JSON(http.StatusOK, tagdetailList)
}

// create tagDetails receive json -> animes_id, tagDetails_tags_id
func CreateTagDetail(c *gin.Context) {
	var t = models.TagDetail{}
	if err := c.BindJSON(&t); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": err,
		})
		return
	}

	if err := initializers.DB.Exec("INSERT INTO tagdetails (`tagDetails_tags_id`, `tagDetails_animes_id`) VALUES ( ? , ? )", t.Tag_id, t.Anime_id).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": err,
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Create tagDetail success",
	})
}

// get all animes using tags_id
func GetAnimesByTagId(c *gin.Context) {
	id := c.Param("id")
	animeList := []models.Anime{}
	rows, err := initializers.DB.Raw("SELECT DISTINCT `animes_id`, `animes_name`, `animes_nameTH`, `animes_trailer`, `animes_episodes`, `animes_score`, `animes_image`, `animes_seasonal`, `animes_year`, `animes_content`, `animes_wallpaper`, `animes_duration`, `animes_studioes`, `animes_streaming` FROM animemapdb.animes as A right join animemapdb.tagdetails as T on A.animes_id = T.tagDetails_animes_id WHERE tagDetails_tags_id = ? ", id).Rows()
	defer rows.Close()

	for rows.Next() {
		var anime models.Anime
		err = rows.Scan(&anime.Id, &anime.Name, &anime.Name_TH, &anime.Trailer, &anime.Episodes, &anime.Score, &anime.Image, &anime.Seasonal, &anime.Year, &anime.Content, &anime.Wallpaper,
			&anime.Duration, &anime.Studio, &anime.Streaming)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"message": err,
			})
			return
		}
		animeList = append(animeList, anime)
	}

	// c.JSON(http.StatusOK, gin.H{
	// 	"message": animeList,
	// })
	c.JSON(http.StatusOK, animeList)
}

// get all tags using animes_id
func GetTagsByAnimesId(c *gin.Context) {
	id := c.Param("id")
	tagList := []models.Tag{}
	rows, err := initializers.DB.Raw("SELECT DISTINCT `tags_id`, `tags_name`, `tags_universe_status`, `tags_wallpaper` FROM animemapdb.tags as T right join animemapdb.tagdetails as D on T.tags_id = D.tagDetails_tags_id WHERE tagDetails_animes_id = ? ", id).Rows()
	defer rows.Close()

	for rows.Next() {
		var t models.Tag
		err = rows.Scan(&t.Id, &t.Name, &t.Universe_status, &t.Wallpaper)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"message": err,
			})
			return
		}
		tagList = append(tagList, t)
	}

	// c.JSON(http.StatusOK, gin.H{
	// 	"message": tagList,
	// })
	c.JSON(http.StatusOK, tagList)
}
