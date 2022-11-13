import { useState, useEffect } from 'react';
import './index.scss'
import AdminAnimeTable from "../../../components/table/AdminAnimeTable"
import AdminAddAnimeModal from '../../../components/modal/AdminAddAnimeModal';
import Datastudio from '../../../data/studio.json'
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TextField from '@mui/material/TextField'
import dayjs from 'dayjs';
//import { fetchAnimeAsync } from '../../actions/animeListAction'
import { useGetAllAnimesQuery } from '../../../services/anime'
import { useDispatch,useSelector } from 'react-redux'

const seasonOptions = [
    { id:1,value: 'Winter', label: 'Winter' },
    { id:2,value: 'Spring', label: 'Spring' },
    { id:3,value: 'Summer', label: 'Summer' },
    { id:4,value: 'Fall', label: 'Fall' }
]

const AdminAnimePage = () => {
    const [year, setYear] = useState(null)
    const [studio, setStudio] = useState("")
    const [season, setSeason] = useState("")

    const [modalAnime, setModalAnime] = useState()
    const [modalMode, setModalMode] = useState('')
    const [open, setOpen] = useState(false);

    const { data, error, isLoading } = useGetAllAnimesQuery()
    const handleOpen = (item, mode) => {
        setModalMode(mode);
        if (mode == "edit") {
            setModalAnime(item)
        }
        setOpen(true);
    }
    const handleClose = () => setOpen(false);
    const onChangItem = name => event => {
        if (name == "year" && event!=null) {
            setYear(event.format('YYYY'))
        }
        else if (name == "studio") {
            setStudio(event.target.value)
        }
        else if (name == "season") {
            setSeason(event.target.value)
        }
    }
    const clearChange=()=>{
        setStudio("")
        setSeason("")
        setYear(null)
    }

    const filterAnime=(item)=>{
        if(studio=="" && season=="" && year==null){
            return item
        }else if(studio==item.Studio && season=="" && year==null){
            return item
        }else if(studio=="" && season==item.animes_seasonal && year==null){
            return item
        }else if(studio=="" && season=="" && year==item.animes_year){
            return item
        }else if(studio==item.Studio && season==item.animes_seasonal && year==null){
            return item
        }else if(studio=="" && season==item.animes_seasonal && year==item.animes_year){
            return item
        }else if(studio==item.Studio && season=="" && year==item.animes_year){
            return item
        }else if(studio==item.Studio && season==item.animes_seasonal && year==item.animes_year){
            return item
        }
    }
    const dispatch=useDispatch()
    useEffect(()=>{
        //dispatch(fetchAnimeAsync())
    },[])
    //const Dataanime = useSelector(state=>state.animeList)

    const displayAnime=data?.filter(filterAnime);

    
    return (
        <div>
            <div className="adminAnime-header">
                <h1>Anime</h1>
                <button onClick={() => handleOpen([], "create")}>Add Anime</button>
            </div>
            <Paper
                elevation={3}
                sx={{
                    mb: 3,
                    p: 2
                }}>
                <div className="adminAnime-container-paper">
                    <div className='adminAnime-container-paper-item'>
                        <FormControl sx={{ m: 1, width: 240 }}>
                            <InputLabel id="demo-simple-select-label">Studio</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Studio"
                                value={studio}
                                name="studio"
                                onChange={onChangItem("studio")}
                            >{Datastudio.map((item)=> <MenuItem value={item.studio_name} key={item.id}>{item.studio_name}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </div>
                    <div className='adminAnime-container-paper-item'>
                        <FormControl sx={{ m: 1, width: 240 }}>
                            <InputLabel id="demo-simple-select-label">Season</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Season"
                                value={season}
                                name="season"
                                onChange={onChangItem("season")}
                            >{seasonOptions.map((item) => (
                                <MenuItem value={item.value} key={item.id}>{item.label}</MenuItem>
                            ))}

                            </Select>
                        </FormControl>
                    </div>
                    <div className='adminAnime-container-paper-item'>
                        <FormControl
                            variant="standard"
                            sx={{
                                width: 240,
                                m: 1
                            }}
                        >
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    views={['year']}
                                    value={year}
                                    label="Year"
                                    name="year"
                                    minDate={dayjs('1950')}
                                    maxDate={dayjs()}
                                    onChange={onChangItem("year")}
                                    renderInput={(params) => <TextField {...params} helperText={null} />}
                                />
                            </LocalizationProvider>
                        </FormControl>
                    </div>
                    <div className='adminAnime-container-paper-item'>
                        <button className='adminAnime-clear-button' onClick={clearChange}>Clear</button>
                    </div>
                </div>
            </Paper>
            <AdminAnimeTable anime={displayAnime} isLoading={isLoading} isError={error}/>
            <AdminAddAnimeModal open={open} onClose={handleClose} anime={modalAnime} mode={modalMode} />
        </div>
    )
}
export default AdminAnimePage