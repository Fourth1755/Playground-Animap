package models

type TagDetail struct {
	Id       int `db:"tagDetails_id" json:"tagDetails_id"`
	Tag_id   int `db:"tagDetails_tags_id" json:"tagDetails_tags_id"`
	Anime_id int `db:"tagDetails_animes_id" json:"tagDetails_animes_id"`
}
