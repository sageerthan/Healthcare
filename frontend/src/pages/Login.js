import React, { useContext, useState } from 'react'
import { StoreContext } from '../context/StoreContext'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const {url,isAuthenticated,setIsAuthenticated,setToken} =useContext(StoreContext);
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");

  const navigate=useNavigate();

  const handleLogin=async(e)=>{
    e.preventDefault();
    try{
      const response = await axios.post(`${url}/api/v1/user/login`,
        {email,password,role:"Patient"},
        {
          withCredentials:true,
          headers:{
          "Content-Type":"application/json"
          }
        });
       setToken(response.data.token);
       localStorage.setItem('token',response.data.token);
       setIsAuthenticated(true);
       toast.success(response.data.message);
       navigate("/") 
    }
    catch(error){
      toast.error(error.response.data.message);
    }
  };

  if(isAuthenticated){
    return <Navigate to={"/"}/>
  }

    return (
    <div className='container form-component login-form'>
        <h2>Sign In</h2>
        <p>Please Login To Continue</p>
        <form onSubmit={handleLogin}>
          <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Email'/>
          <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Password'/>
          <div style={{gap:"10px", justifyContent:"flex-end",flexDirection:"row"}} >
              <p style={{marginBottom:0}}>Not Registered?</p>
              <Link to={'/register'} style={{textDecoration:"none",alignItems:"center"}}>Register Now</Link>
          </div>
          <div style={{justifyContent:"center",alignItems:"center"}}>
             <button type="submit">Login</button>
          </div>
        </form>
    </div>
  )
}

export default Login