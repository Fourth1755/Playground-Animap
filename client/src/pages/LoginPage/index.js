import './index.scss'
import React, { useState, useEffect } from "react";
import { Link, withRouter, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import axios from "axios";
import withReactContent from 'sweetalert2-react-content'
import isEmail from 'validator/lib/isEmail';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { authenticate } from "../../services/authorize";

const LoginPage = () => {
    
    const navigate = useNavigate();
    const MySwal = withReactContent(Swal)
    const [values, setValues] = useState({
        showPassword: false,
    });
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isValidEmail, setIsValidEmail] = useState(false)
    const [isValidPassword, setIsValidPassword] = useState(false)
    const [checked, setChecked] = useState(false)
    const handleChangeChecked = (event) => {
        setChecked(event.target.checked)
    }
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleChangeEmail = (event) => {
        const val = event.target.value;
        if (isEmail(val)) {
            setIsValidEmail(true);
        } else {
            setIsValidEmail(false);
        }
        setEmail(val)
    }
    const handleChangePassword = (event) => {
        const pass = event.target.value;
        setPassword(pass)
    }
    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const submitForm = () => {
        axios.post(`http://localhost:5000/login`, {
            username: email,
            password: password
        })
            .then((response) =>response.data)
            .then((res) => { authenticate(res, () => navigate('/')) })
            .catch(err => {
                MySwal.fire(
                    'เข้าสู่ระบบไม่สำเร็จ',
                    `${err.response.data.error}`,
                    'error',
                    err,
                )
             })
    }

    // const submitForm = async () => {
    //     await fetch(`http://localhost:5000/login`,{
    //         method:'POST',
    //         headers:{
    //             'Content-Type':'application/json',
    //         },
    //         body:JSON.stringify({
    //             username: email, 
    //             password: password
    //         }),
    //     }).then(response =>response.json())
    //     .then((data) => { 
    //         authenticate(data, () => navigate('/'))
    //    })
    //     .catch((err) => {
    //         MySwal.fire(
    //             'เข้าสู่ระบบไม่สำเร็จ',
    //             `${err.response.data.error}`,
    //             'error',
    //             err,
    //         )
    //     })  
    // }
    return (
        <div>
            <div className='login-bar'>
                <div className='login-logo'>
                    <h1><a href='/'>AniMap</a></h1>
                </div>
            </div>
            <div className='login-container'>
                <div className='login-card'>
                    <h1>Sign In</h1>
                    <FormControl
                        fullWidth
                        sx={{
                            color: 'white',
                            mb: 3
                        }}
                        variant="standard"
                    >
                        <h3>Email</h3>
                        <OutlinedInput
                            className='textField'
                            hiddenLabel
                            required
                            value={email}
                            onChange={handleChangeEmail}
                            id="outlined-adornment"
                            placeholder="e-mail"
                        />
                    </FormControl>
                    <FormControl
                        fullWidth
                        sx={{
                            color: 'white',
                            mb: 3
                        }}
                        variant="standard"
                    >
                        <h3>Password</h3>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            className='textField'
                            type={values.showPassword ? 'text' : 'password'}
                            value={password}
                            hiddenLabel
                            required
                            placeholder="password"
                            onChange={handleChangePassword}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <button className='login-button' onClick={submitForm}>Sign In</button>
                    {/* <FormControlLabel
                        label="Remember Me"
                        sx={{
                            '.MuiFormControlLabel-label': {
                                color: 'white',
                            },
                        }}
                        control={<Checkbox
                            checked={checked}
                            onChange={handleChangeChecked}
                            sx={{
                                color: pink[800],
                                '&.Mui-checked': {
                                    color: pink[600],
                                },
                            }}
                        />} /> */}
                    <div className='login-card-bottom'><p>New to animap?</p><Link to="/register">Sign Up now</Link></div>
                </div>
            </div>
        </div>);
}
export default LoginPage