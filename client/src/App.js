import './App.scss';
import Navbar from './layouts/Navbar';
import HomePage from './pages/User/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import SidebarAdmin from './layouts/SidebarAdmin';
import { useLocation } from 'react-router-dom'
import {Route ,Routes} from 'react-router-dom'
function App() {
  const AuthApp=()=>{
    return (
    <Routes>
        <Route path="/" element={<HomePage/>}/>
        {/* <Route path="/topanime" element={<TopAnimePage/>}/>
        <Route path="/anime/:id" element={<SingleAnimePage/>}/>
        <Route path="/studio/:id" element={<SingleStudioPage/>}/>
        <Route path="/allstudio" element={<StudioPage/>}/>
        <Route path="/allanime" element={<SeasonnalAnimePage/>}/>
        <Route path="/mymap" element={<AnimeMapPage/>}/> */}
        <Route path="*" element={<NotFoundPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        {/* <Route path="/profile" element={<ProfilePage/>}/> */}
    </Routes>
    )
  }
  const UnAuthApp=()=>{
    return(
      <Routes>
          <Route path="/" element={<HomePage/>}/>
          {/* <Route path="/topanime" element={<TopAnimePage/>}/>
          <Route path="/anime/:id" element={<SingleAnimePage/>}/>
          <Route path="/studio/:id" element={<SingleStudioPage/>}/>
          <Route path="/allstudio" element={<StudioPage/>}/>
          <Route path="/allanime" element={<SeasonnalAnimePage/>}/> */}
          <Route path="*" element={<NotFoundPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
      </Routes>
      )
  }
  return (
    <>
      
      <AuthApp/>
    </>
  );
}

export default App;
