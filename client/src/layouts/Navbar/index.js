import './index.scss'
import { Link } from "react-router-dom";
import { useState } from 'react';

const Navbar=()=>{
    //const user=getUser()
    const [isNavExpanded, setIsNavExpanded] = useState(false)
    return(
        <div className='navigation'>
            <div className='navigation-left'>
                <div className='navigation-logo'>
                    <h1><Link to='/'>AniMap</Link></h1>
                </div>
                <div className="navigation-menu">
                    <ul>
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to="/allanime">Anime</Link></li>
                        <li><Link to="/allstudio">Studio</Link></li>
                        <li><Link to="/topanime">Top Anime</Link></li>
                        {/* {user?<li><Link to="/mymap">My Map</Link></li>:<></>} */}
                    </ul>
                </div>
            </div>
            <div className='navigation-right'>
                {/* <SearchBarAnime/> */}
                {/* {user?<ProfileBar/>:<Link to="/login" className='navbar-login-button' >Login</Link>} */}
            </div>
        </div>
    )
}
export default Navbar;