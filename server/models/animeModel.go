package models

type Anime struct {
	Id      int    `db:"animes_id" json:"animes_id"`
	Name    string `db:"animes_name" json:"animes_name"`
	Name_TH string `db:"animes_nameTH" json:"animes_nameTH"`
	Year    int    `db:"animes_year" json:"animes_year"`
	// Studioes  []Studio
	Studio   string `db:"animes_studioes json:"animes_studioes"`
	Trailer  string `db:"animes_trailer" json:"animes_trailer"`
	Episodes int    `db:"animes_episodes" json:"animes_episodes"`
	// Fix_score float64
	Score     float64 `db:"animes_score" json:"animes_score"`
	Image     string  `db:"animes_image" json:"animes_image"`
	Seasonal  string  `db:"animes_seasonal" json:"animes_seasonal"`
	Content   string  `db:"animes_content" json:"animes_content"`
	Wallpaper string  `db:"animes_wallpaper" json:"animes_wallpaper"`
	Duration  string  `db:"animes_duration" json:"animes_duration"`
	Streaming string  `db:"animes_streaming" json:"animes_streaming"`
}
