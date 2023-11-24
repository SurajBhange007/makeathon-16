import React, { useEffect, useState } from 'react'
// import { Navigate } from 'react-router-dom'
import { NavLink, useNavigate } from 'react-router-dom'
import '../Style/form.css';
import API from '../API';

export const Form = (props) => {
    const [userData, setUserDetails] = useState({userName: '', password: ''})
    const [selectedLanguage, setselectedLanguage] = useState();
    const [usernameError, setUsernameError] = useState()
    const [passwordError, setPasswordError] = useState()
    const Navigate = useNavigate();
    useEffect(() => {
        const getData = async () => {
            let data = await API.getLoginDetails()
            console.log(data);
        }
        getData()
    }, [])
    const handleInput = e => {
        setUserDetails(prev => {return {...prev, [e.target.name]: e.target.value}})
        if(e.target.name === 'userName') setUsernameError(null)
        else setPasswordError(null)
    }


    const handleSubmitForm = e => {
        if (userData.userName.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@([a-zA-Z0-9-])+(.[a-zA-Z0-9-]{2,})$/) && userData.password.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)) {
            e.preventDefault()
            if (props.isLogin) Navigate('/')
            else Navigate('/login')
        }
        else {
            if (!userData.userName.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@([a-zA-Z0-9-])+(.[a-zA-Z0-9-]{2,})$/))  setUsernameError('You have entered an invalid email address')
            else if(!userData.password.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)) setPasswordError('Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters')
        } 
    }

    const handleLanguageSelect = e => {
        setselectedLanguage(e.target.value);
    }


  return (
    <div className='c-form-container'>
        <div className='form-wrapper'>
            <div className={`${usernameError ? 'danger-text' : ''} control-field`}>
            <label className="label item-1 form-label" htmlFor='username'>Email Id</label>
            <input className="rounded border item-2 form-control" style={{paddingLeft: '7px'}} type="text" name='userName'
            id ="username" value={userData.userName} placeholder="Enter Email Id" onChange={handleInput} title={usernameError} required/>
            </div>
            {usernameError && <div className='text-danger error-text'><sup>*</sup>{usernameError}</div>}
            <div className={`${passwordError ? 'danger-text' : ''} control-field`}>
            <label className="label item-1 form-label" htmlFor='password'>Password</label>
            <input className="rounded border item-2 form-control" style={{paddingLeft: '7px'}} id="password" name='password'
            value={userData.password} type="password" placeholder="Enter password" onChange={handleInput} title={passwordError} required/>
            </div>
            {passwordError && <div className='text-danger error-text'><sup>*</sup>{passwordError}</div>}
            {!props.isLogin && <div className={`select control-field`}>
            <label className="label item-1 form-label" htmlFor='userLanguage'>Language</label>
            <select name="selectedLanguage" id="userLanguage" className='rounded border item-2 form-control' value={selectedLanguage} style={{paddingLeft: '7px'}}
            placeholder='Select Language' required onChange={handleLanguageSelect}>
                <option value="Lang1">Lang1</option>
                <option value="Lang2">Lang2</option>
                <option value="Lang3">Lang3</option>
                <option value="Lang4">Lang4</option>
            </select>
            </div>}
           </div>
        <button className={`${!userData.userName || !userData.password ? 'disabled' : ' '} btn btn-primary mb-20`} onClick={handleSubmitForm}>{props.isLogin ? "Login" : "Sign up"}</button>
        <div className='nav-link-w'>{props.isLogin ? "Don't have an account? " : "Already have an account? "} <span><NavLink className="nav-link" to={props.isLogin ? "/sign-up" : "/login"}>{props.isLogin ? "Sign Up" : "Login"}</NavLink></span></div>
    </div>
)
}
