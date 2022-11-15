package initializers

import (
	"anime/go-api/models"
)

func SyncDatabase() {
	// AutoMirage
	DB.AutoMigrate(&models.User{})
}
