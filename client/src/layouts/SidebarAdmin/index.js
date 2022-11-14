import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import TagIcon from '@mui/icons-material/Tag';
import MenuIcon from '@mui/icons-material/Menu';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import { pink } from '@mui/material/colors';
import { Route ,Routes} from 'react-router-dom'
import AdminHomePage from '../../pages/Admin/AdminHomePage';
import AdminAnimePage from '../../pages/Admin/AdminAnimePage';
import AdminTagPage from '../../pages/Admin/AdminTagPage';
import NotFoundPage from '../../pages/NotFoundPage';
import { useNavigate } from "react-router-dom";
import './index.scss'
const drawerWidth = 240;

function SidebarAdmin(props) {
    const { window} = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const navigate = useNavigate();
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const SideList = [
        { id: '4', item: "Home", icon:  <AssignmentIndIcon/>,link:"/"},
        { id: '1', item: "Anime", icon: <LocalMoviesIcon/> ,link:"/adminanime"},
        { id: '2', item: "Anime Tag", icon:  <TagIcon/>,link:"/admintaganime"},

    ]
    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <List>
                {SideList.map((text, index) => (
                    <ListItem key={text.item} disablePadding onClick={()=>navigate(`${text.link}`)}>
                        <ListItemButton>
                            <ListItemIcon>
                                {text.icon}
                            </ListItemIcon>
                            <ListItemText primary={text.item} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    backgroundColor: pink[400],
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div"  sx={{ flexGrow: 1 }}>
                        Anime-Map&ToonView
                    </Typography>
                    <a href='/login' className='logout-button'>Logout</a>
                </Toolbar>
               
            </AppBar> 
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                <Routes>
                    {/* <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/register" element={<RegisterPage/>}/> */}
                    <Route path="/" element={<AdminHomePage/>}/>
                    <Route path="*" element={<NotFoundPage/>}/>
                    <Route path="/adminanime" element={<AdminAnimePage/>}/>
                    <Route path="/admintaganime" element={<AdminTagPage/>}/>
                </Routes>
            </Box>
        </Box>
    );
}

SidebarAdmin.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default SidebarAdmin;