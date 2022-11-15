package models

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Email     string `gorm:"unique"`
	Pwd       string
	Role      string
	Name      string
	CountLog  int
	LastLogin time.Time
}
