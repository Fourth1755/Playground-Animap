import './index.scss'
const Wallpaper=(props)=>{
    const {type} = props
    const mainWallpaper= "https://wallpaperaccess.com/full/3097725.jpg"
    let wallpaperStyle = {
        width: `100%`,
        height: `520px`,
        backgroundImage: `url(${mainWallpaper})`,
        backgroundRepeat: `no-repeat`,
        backgroundPosition: `center center`,
        backgroundSize: `cover`
      };
    return(
        <div style={wallpaperStyle}>
            <div className='wallpaper-text'>
            {type=="main"?<><h1>Welcome to Anime Map</h1>
                <h6>MAP (memory anime path)</h6></>:
                <><h1>Wellcome to Anime</h1></>} 
            </div>   
        </div>
    )
}
export default Wallpaper;