package controllers

import (
	"anime/go-api/initializers"
	"anime/go-api/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

// get all studioes
func GetAllStudioes(c *gin.Context) {
	studioList := []models.Studio{}

	rows, err := initializers.DB.Table("animemapmaster.studioes").Select("studioes_id", "studioes_name", "studioes_logo", "studioes_established", "studioes_description", "studioes_image").Rows()
	defer rows.Close()
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": err,
		})
	}

	for rows.Next() {
		var s models.Studio
		err = rows.Scan(&s.Id, &s.Name, &s.Logo, &s.Established, &s.Description, &s.Image)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"message": err,
			})
		}
		studioList = append(studioList, s)
	}

	// c.JSON(http.StatusOK, gin.H{
	// 	"message": studioList,
	// })
	c.JSON(http.StatusOK, studioList)
}

// get studio using studioes_id
func GetStudioById(c *gin.Context) {
	id := c.Param("id")
	studio := models.Studio{}
	row := initializers.DB.Table("studioes").Where("studioes_id = ?", id).Select("studioes_id", "studioes_name", "studioes_logo", "studioes_established", "studioes_description", "studioes_image").Row()
	if err := row.Err(); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": err,
		})
	}

	row.Scan(&studio.Id, &studio.Name, &studio.Logo, &studio.Established, &studio.Description, &studio.Image)

	// c.JSON(http.StatusOK, gin.H{
	// 	"message": studio,
	// })
	c.JSON(http.StatusOK, studio)
}

// get studio using studioes_id
func GetStudioByStudioName(c *gin.Context) {
	name := c.Param("name")
	studio := models.Studio{}
	row := initializers.DB.Table("studioes").Where("studioes_name = ?", name).Select("studioes_id", "studioes_name", "studioes_logo", "studioes_established", "studioes_description", "studioes_image").Row()
	if err := row.Err(); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": err,
		})
	}

	row.Scan(&studio.Id, &studio.Name, &studio.Logo, &studio.Established, &studio.Description, &studio.Image)

	// c.JSON(http.StatusOK, gin.H{
	// 	"message": studio,
	// })
	c.JSON(http.StatusOK, studio)
}
