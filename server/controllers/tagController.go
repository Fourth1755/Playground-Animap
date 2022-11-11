package controllers

import (
	"anime/go-api/initializers"
	"anime/go-api/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

// get all tags
func GetAllTags(c *gin.Context) {
	tagList := []models.Tag{}
	rows, err := initializers.DB.Table("tags").Select(`tags_id`, `tags_name`, `tags_universe_status`, `tags_wallpaper`).Rows()
	defer rows.Close()
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": err,
		})
		return
	}

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

// get tag using tags_id
func GetTagById(c *gin.Context) {
	id := c.Param("id")
	tag := models.Tag{}
	row := initializers.DB.Table("tags").Where("tags_id = ?", id).Select("tags_id", "tags_name", "tags_universe_status", "tags_wallpaper").Row()
	if err := row.Err(); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": err,
		})
		return
	}

	row.Scan(&tag.Id, &tag.Name, &tag.Universe_status, &tag.Wallpaper)

	// c.JSON(http.StatusOK, gin.H{
	// 	"message": tag,
	// })
	c.JSON(http.StatusOK, tag)
}

// create tag receive json -> tags_name, tags_universe_status, tags_wallpaper
func CreateTag(c *gin.Context) {
	var tag models.Tag
	if err := c.BindJSON(&tag); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": err,
		})
		return
	}

	if err := initializers.DB.Exec("INSERT INTO tags (`tags_name`, `tags_universe_status`, `tags_wallpaper`) VALUES ( ? , ? , ? )", tag.Name, tag.Universe_status, tag.Wallpaper).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": err,
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Create tag success",
	})

}

// update tag using id in path parameter and receive json -> tags_name, tags_universe_status, tags_wallpaper
func UpdateTag(c *gin.Context) {
	id := c.Param("id")
	tag := models.Tag{}
	row := initializers.DB.Table("tags").Where("tags_id = ?", id).Select("tags_id", "tags_name", "tags_universe_status", "tags_wallpaper").Row()
	if err := row.Err(); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": err,
		})
		return
	}
	row.Scan(&tag.Id, &tag.Name, &tag.Universe_status, &tag.Wallpaper)

	var newTag = models.Tag{}
	if err := c.BindJSON(&newTag); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": err,
		})
		return
	}

	if newTag.Name != "" {
		tag.Name = newTag.Name
	}
	if newTag.Universe_status != tag.Universe_status {
		tag.Universe_status = newTag.Universe_status
	}
	if newTag.Wallpaper != "" {
		tag.Wallpaper = newTag.Wallpaper
	}
	if err := initializers.DB.Exec("UPDATE `tags` SET `tags_name` = ? ,`tags_universe_status` = ? ,`tags_wallpaper` = ? WHERE `tags_id` = ?;", tag.Name, tag.Universe_status, tag.Wallpaper, id).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": err,
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Update tag success",
	})

}
