import Modal from '@mui/material/Modal';
import { useNavigate } from "react-router-dom";
import './index.scss'
import dayjs from 'dayjs';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField'
import { useState, useEffect } from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Datastudio from '../../../data/studio.json'

const seasonOptions = [
    { id:1,value: 'Winter', label: 'Winter' },
    { id:2,value: 'Spring', label: 'Spring' },
    { id:3,value: 'Summer', label: 'Summer' },
    { id:4,value: 'Fall', label: 'Fall' }
]

const AdminAddAnimeModal = (props) => {
    const { open, onClose, anime, mode } = props
    const navigate = useNavigate()

    const [name,setName] =useState()
    const [year, setYear] = useState()
    const [studio, setStudio] = useState()
    const [season, setSeason] = useState([])
    const [episodes,setEpisodes]= useState()
    const [image,setImage]= useState()
    const [trailer,setTrailer]=useState()
    const [wallpaper,setWallpaper]=useState()
    const [duration,setDuration]=useState()
    const [score,setScore]=useState()
    const [descript,setDescript]=useState()
    const onChangItem = name => event => {
        if (name == "name") {
            setName(event.value)
        }
        else if (name == "year") {
            setYear(event)
        }
        else if (name == "studio") {
            setStudio(event.target.value)
        }
        else if (name == "season") {
            setSeason(event.target.value)
        } 
        else if (name == "episodes") {
            setEpisodes(event.value)
        }
        else if (name == "image") {
            setImage(event.value)
        }
        else if (name == "trailer") {
            setTrailer(event.value)
        }
        else if (name == "wallpaper") {
            setWallpaper(event.value)
        }
        else if (name == "duration") {
            setDuration(event.value)
        }
        else if (name == "score") {
            setScore(event.value)
        }
        else if (name == "descript") {
            setDescript(event.value)
        }
    }
    useEffect(() => {
        if (mode =="edit") {
            setName(anime.animes_name)
            setYear(anime.animes_year.toString())
            setStudio(anime.Studio)
            setSeason(anime.animes_seasonal)
            setEpisodes(anime.animes_episodes)
            setImage(anime.animes_image)
            setTrailer(anime.animes_trailer)
            setWallpaper(anime.animes_wallpaper)
            setDuration(anime.animes_duration)
            setScore(anime.animes_score)
            setDescript(anime.animes_content)
        }else if(mode == "create"){
            setSeason(seasonOptions[Math.ceil((dayjs().month()+1)/4)].value)
            setYear(dayjs())
        }
    }, [mode,open])
    const submitFormAnime=()=>{
        console.log(name)
            console.log(year)
            console.log(studio)
            console.log(season)
            console.log(episodes)
            console.log(image)
            console.log(trailer)
            console.log(wallpaper)
            console.log(duration)
            console.log(score)
            console.log(descript)
        // if(mode=="create"){
            
        // }else{

        // }
    }
    return (
        <div className='modal-body'>
            <Modal
                open={open}
                onClose={onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className='modal-body'
            >
                <div className="modal-addanime-modalStyles">
                    {mode == "create" ? <h2>Add New Anime</h2> : <h2>Edit Anime</h2>}
                    <div className="modal-addanime-container">
                        <FormControl
                            fullWidth
                            sx={{
                                mb: 1
                            }}
                            variant="standard"
                        >
                            <h3>Anime name</h3>
                            <TextField
                                hiddenLabel
                                required
                                id="outlined-adornment"
                                placeholder="Anime name"
                                value={name}
                                name="name"
                                onChange={onChangItem("name")}
                            />
                        </FormControl>
                        <div className='modal-addanime-form'>
                            <FormControl
                                variant="standard"
                                sx={{
                                    width: 240,
                                    mb: 1
                                }}
                            >
                                <h3>Score</h3>
                                <TextField
                                    hiddenLabel
                                    required
                                    id="outlined-adornment"
                                    placeholder="Score"
                                    value={score}
                                    name="score"
                                    onChange={onChangItem("score")}
                                />
                            </FormControl>
                            <FormControl
                                sx={{
                                    width: 240,
                                    mb: 1
                                }}
                            >
                                <h3>Studio</h3>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    required
                                    value={studio}
                                    name="studio"
                                    onChange={onChangItem("studio")}
                                >{Datastudio.map((item) => (
                                    <MenuItem value={item.studio_name} key={item.studio_name}>{item.studio_name}</MenuItem>
                                ))}
                                </Select>
                            </FormControl>
                        </div>
                        <div className='modal-addanime-form'>
                            <FormControl
                                sx={{
                                    width: 240,
                                    mb: 1
                                }}
                            >
                                <h3>Season</h3>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={season}
                                    name="season"
                                    onChange={onChangItem("season")}
                                >{seasonOptions.map((item) => (
                                    <MenuItem value={item.value} key={item.id}>{item.label}</MenuItem>
                                ))}
                                </Select>
                                
                            </FormControl>
                            <FormControl
                                variant="standard"
                                sx={{
                                    width: 240,
                                    mb: 1
                                }}
                            >
                                <h3>Year</h3>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        views={['year']}
                                        value={year}
                                        hiddenLabel
                                        name="year"
                                        minDate={dayjs('1950')}
                                        maxDate={dayjs()}
                                        onChange={onChangItem("year")}
                                        renderInput={(params) => <TextField {...params} helperText={null} />}
                                    />
                                </LocalizationProvider>
                            </FormControl>
                        </div>
                        <div className='modal-addanime-form'>
                            <FormControl
                                variant="standard"
                                sx={{
                                    width: 240,
                                    mb: 1
                                }}
                            >
                                <h3>Episodes</h3>
                                <TextField
                                    hiddenLabel
                                    required
                                    id="outlined-adornment"
                                    placeholder="Ex 25, 1, 13"
                                    value={episodes}
                                    name="episodes"
                                    onChange={onChangItem("episodes")}
                                />
                            </FormControl>
                            <FormControl
                                variant="standard"
                                sx={{
                                    width: 240,
                                    mb: 1
                                }}
                            >
                                <h3>Duration</h3>
                                <TextField
                                    hiddenLabel
                                    required
                                    id="outlined-adornment"
                                    placeholder="Ex 25 min. per ep."
                                    value={duration}
                                    name="duration"
                                    onChange={onChangItem("duration")}
                                />
                            </FormControl>
                        </div>
                        
                        <FormControl
                            fullWidth
                            sx={{
                                mb: 1
                            }}
                            variant="standard"
                        >
                            <h3>Image (link)</h3>
                            <TextField
                                hiddenLabel
                                required
                                id="outlined-adornment"
                                placeholder="Ex. https://images5.alphacoders.com/587/thumbbig-587597.webp"
                                value={image}
                                name="image"
                                onChange={onChangItem("image")}
                            />

                        </FormControl>
                        <FormControl
                            fullWidth
                            sx={{
                                mb: 1
                            }}
                            variant="standard"
                        >
                            <h3>Video (link)</h3>
                            <TextField
                                hiddenLabel
                                required
                                id="outlined-adornment"
                                placeholder="Ex. https://www.youtube.com/embed/eKoD2CRr_KA"
                                value={trailer}
                                name="trailer"
                                onChange={onChangItem("trailer")}

                            />
                        </FormControl>
                        <FormControl
                            fullWidth
                            sx={{
                                mb: 1
                            }}
                            variant="standard"
                        >
                            <h3>Wallpaper (link)</h3>
                            <TextField
                                hiddenLabel
                                required
                                id="outlined-adornment"
                                placeholder="Ex. https://images5.alphacoders.com/587/thumbbig-587597.webp"
                                value={wallpaper}
                                name="wallpaper"
                                onChange={onChangItem("wallpaper")}

                            />
                        </FormControl>
                        <FormControl
                            fullWidth
                            sx={{
                                mb: 1
                            }}
                            variant="standard"
                        >
                            <h3>Descript</h3>
                            <TextField
                                hiddenLabel
                                required
                                id="outlined-multiline-static"
                                multiline
                                rows={4}
                                value={descript}
                                name="descript"
                                onChange={onChangItem("descript")}
                            />
                        </FormControl>
                    </div>
                    <div className='modal-addanime-container-bottom'>
                        <button onClick={submitFormAnime}>{mode == "create" ? "Add New":" Edit Anime"}</button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}
export default AdminAddAnimeModal