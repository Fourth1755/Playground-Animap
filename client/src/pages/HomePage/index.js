import Wallpaper from '../../components/Wallpaper';
//import SliderAnime from "../../component/SliderAnime";
//import {fetchAnimeAsync} from '../../actions/animeListAction'
//import {fetchAnimeByAccountAsync} from '../../actions/animeDetailListAction'
//import { useDispatch,useSelector } from 'react-redux'
import { useState, useEffect } from "react";
import axios from 'axios';
//import { getUser } from "../../servies/authorize";

const HomePage=()=>{
    return(
        <div>
            <Wallpaper type="main"/>
        </div>
    )
}
export default HomePage;