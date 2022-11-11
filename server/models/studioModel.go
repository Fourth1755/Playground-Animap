package models

type Studio struct {
	Id          int    `db:"studioes_id" json:"studioes_id"`
	Name        string `db:"studioes_name" json:"studioes_name"`
	Logo        string `db:"studioes_logo" json:"studioes_logo"`
	Established string `db:"studioes_established" json:"studioes_established"`
	Description string `db:"studioes_description" json:"studioes_description"`
	Image       string `db:"studioes_image" json:"studioes_image"`
}
