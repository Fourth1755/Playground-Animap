package models

type Tag struct {
	Id              int    `db:"tags_id" json:"tags_id"`
	Name            string `db:"tags_name" json:"tags_name"`
	Universe_status bool   `db:"tags_universe_status" json:"tags_universe_status"`
	Wallpaper       string `db:"tags_wallpaper" json:"tags_wallpaper"`
}
