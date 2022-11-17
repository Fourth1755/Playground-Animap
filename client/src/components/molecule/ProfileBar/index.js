import './index.scss'
import {Link,withRouter} from "react-router-dom";
import { getRole, getUser,logout } from "../../../services/authorize";
const ProfileBar=()=>{
    return(
        <div class="dropdown">
            <button class="user-profile"></button>
            <div class="dropdown-content">
                <Link to="/profile">Profile</Link>
                <Link to="/account">Account</Link>
                <Link to="/login" onClick={()=>logout()}>Logout</Link>
            </div>
        </div>
    )
}
export default ProfileBar;