import './index.scss'
import React, { useState,useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import withReactContent from 'sweetalert2-react-content'
import { Link, withRouter, Navigate } from "react-router-dom";
import isEmail from 'validator/lib/isEmail';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormHelperText from '@mui/material/FormHelperText';

const RegisterPage = () => {
    const [values, setValues] = useState({
        firstname: '',
        showPassword: false,
        showRePassword: false,
    });
    const [firstname,setFirstname]= useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword] =useState('')
    const [confirmPassword,setConfirmPassword]=useState('')

    const [isValidFirstname,setIsValidFirstname]=useState(false)
    const [isValidEmail,setIsValidEmail]=useState(false)
    const [isValidPassword,setIsValidPassword]=useState(false)
    const [isValidConPassword,setIsValidConPassword]=useState(false)

    //check Password
    const [letterPass,setLetterPass]=useState(false)
    const [capitalPass,setCapitalPass]=useState(false)
    const [numberPass,setNumberPass]=useState(false)
    const [lengthPass,setLengthPass]=useState(false)

    const [buttonDisabled,setButtonDisabled]=useState(true)

    //const [isValid, setIsValid] = useState(false)  
    const [dirty, setDirty] = useState(false);

    const handleChangeFristname=(event)=>{
        const name=event.target.value;
        if(name!==""){
            setIsValidFirstname(true)
        }else{
            setIsValidFirstname(false)
        }
        setFirstname(name)
    }
    const handleChangeEmail =(event)=>{
        const val =event.target.value;
        if(isEmail(val)) {
            setIsValidEmail(true);              
         } else {
            setIsValidEmail(false);              
         }
         setEmail(val)
    }
    const handleChangePassword =(event)=>{
        const pass =event.target.value;
        // Validate lowercase letters
        var lowerCaseLetters = /[a-z]/g;
        if(pass.match(lowerCaseLetters)) {  
            setLetterPass(true)
        } else {
            setLetterPass(false)
        }
        // Validate capital letters
        var upperCaseLetters = /[A-Z]/g;
        if(pass.match(upperCaseLetters)) {
            setCapitalPass(true)
            
        }else{
            setCapitalPass(false)
        }
        //   // Validate numbers
        var numbers = /[0-9]/g;
        if(pass.match(numbers)){
            setNumberPass(true)
        }else{
            setNumberPass(false)
        }
        //  // Validate length
        if(pass.length >= 8 && pass.length <= 64){
            setLengthPass(true)
        }else{
            setLengthPass(false)
        }
        if(pass.match(lowerCaseLetters) && pass.match(upperCaseLetters) && pass.match(numbers) && pass.length >= 8 && pass.length <= 64){
            setIsValidPassword(true)
        }else{
            setIsValidPassword(false);
        }
        setPassword(pass)
    }
    const handleChangeConfirmPassword =(event)=>{
        const conpass =event.target.value;
        if(conpass!==password){
            setIsValidConPassword(false)
        }else{
            setIsValidConPassword(true)
        }
        setConfirmPassword(conpass)
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
    const navigate = useNavigate();
    const handleClickShowRePassword = () => {
        setValues({
            ...values,
            showRePassword: !values.showRePassword,
        });
    };
    const handleMouseDownRePassword = (event) => {
        event.preventDefault();
    };
    const MySwal = withReactContent(Swal)
    const submitForm=()=>{
        axios.post(`http://localhost:5000/signup`, {
            Name:firstname,
            username:email,
            password:password
        })
        .then((response) => {
            MySwal.fire("Alert", "บันทึกข้อมูลเรียบร้อย", "success");
            navigate(`/login`)
        })
        .catch((error) => {
            MySwal.fire("Alert", error, "error");
        });
    }
    useEffect(()=>{
        if(isValidEmail&&isValidPassword&&isValidConPassword&&firstname){
            setButtonDisabled(false)
        }else{
            setButtonDisabled(true);
        }
    },[email,password,confirmPassword,firstname])
    return (
        <div>
            <div className='login-bar'>
                <div className='login-logo'>
                    <h1><a href='/'>AniMap</a></h1>
                </div>
            </div>
            <div className='login-container'>
                <div className='login-card'>
                    <h2>Create your Animap Account</h2>
                    <FormControl
                        fullWidth
                        sx={{
                            color: 'white',
                            mb: 1
                        }}
                        variant="standard"
                        error={isValidFirstname=== false}
                    >
                        <h3>Your name</h3>
                        <OutlinedInput
                            className='textField'
                            hiddenLabel
                            required
                            value={firstname}
                            onChange={handleChangeFristname}
                            id="outlined-adornment"
                            placeholder="Enter your name"
                        />
                    {!isValidFirstname?<FormHelperText id="component-error-text">You have to enter your name.</FormHelperText>:<></>}
                    </FormControl>
                    <FormControl
                        fullWidth
                        error={isValidEmail=== false}
                        sx={{
                            color: 'white',
                            mb: 1
                        }}
                        variant="standard"
                    >
                        <h3>Email</h3>
                        <OutlinedInput                                   
                            onBlur={() => setDirty(true)}
                            className='textField'
                            hiddenLabel
                            required
                            type='e-mail'
                            value={email}
                            onChange={handleChangeEmail}
                            id="outlined-adornment"
                            placeholder="Enter your email address"
                        />
                        {!isValidEmail?<FormHelperText id="component-error-text">Email address is invalid</FormHelperText>:<></>}
                    </FormControl>
                    <FormControl
                        fullWidth
                        sx={{
                            color: 'white',
                            mb: 1
                        }}
                        error={isValidPassword === false}
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
                            placeholder="Enter your password"
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
                        <div className='register-password'>
                            <h5>Your password must contain the following:</h5>
                            <div id="letter" className={letterPass?"valid":"invalid"}><p>At least 1 lowercase letter</p></div>
                            <div id="capital" className={capitalPass?"valid":"invalid"}><p>At least 1 uppercase letter</p></div>
                            <div id="number" className={numberPass?"valid":"invalid"}><p>At least 1 number</p></div>
                            <div id="length" className={lengthPass?"valid":"invalid"}><p>8-64 characters</p></div>
                        </div>
                    </FormControl>
                    <FormControl
                        fullWidth
                        sx={{
                            color: 'white',
                            mb: 1
                        }}
                        error={isValidConPassword === false}
                        variant="standard"
                    >
                        <h3>Confirm password</h3>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            className='textField'
                            type={values.showRePassword ? 'text' : 'password'}
                            value={confirmPassword}
                            hiddenLabel
                            required
                            placeholder="Enter your password"
                            onChange={handleChangeConfirmPassword}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowRePassword}
                                        onMouseDown={handleMouseDownRePassword}
                                        edge="end"
                                    >
                                        {values.showRePassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        {!isValidConPassword?<FormHelperText id="component-error-text">Your passwords don't match.</FormHelperText>:<></>}
                    </FormControl>
                    <button 
                        className={buttonDisabled?"register-button-disabled":"register-button"}
                        onClick={submitForm}
                        disabled={buttonDisabled}>Create Account</button>
                    <div className='login-card-bottom'><p>Already have an account?</p><Link to="/login">Log In</Link></div>
                </div>
            </div>
        </div>);
}
export default RegisterPage