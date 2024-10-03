import React, { useContext, useState } from 'react'
import { StoreContext } from '../context/StoreContext';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const Register = () => {
  const {url,isAuthenticated,setIsAuthenticated,setToken} =useContext(StoreContext);

  const [firstName,setFirstName]=useState("");
  const [lastName,setLastName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [phone,setPhone]=useState("");
  const [dob,setDob]=useState("");
  const [gender,setGender]=useState("");
  const [nic,setNic]=useState("");

  const navigate=useNavigate();
  const handleRegister = async(e)=>{
          e.preventDefault();
          try{
            const response = await axios.post(`${url}/api/v1/user/register`,
              {firstName,lastName,email,password,phone,dob,gender,nic,role:"Patient"},
              {
                withCredentials:true,
                headers:{
                "Content-Type":"application/json"
                }
              });
             toast.success(response.data.message);
             setToken(response.data.token);
             localStorage.setItem('token',response.data.token)
             setIsAuthenticated(true);
             navigate("/") 
          }
          catch(error){
            toast.error(error.response.data.message);
          }
  }

  if(isAuthenticated){
    return <Navigate to={"/"}/>
  }

  return (
    <div className="container form-component register-form">
      <h2>Sign Up</h2>
      <p>Please Sign Up To Continue</p>
      <form onSubmit={handleRegister}>
        <div>
          <input type="text" placeholder='First Name' value={firstName} onChange={(e)=>setFirstName(e.target.value)}/>
          <input type="text" placeholder='Last Name' value={lastName} onChange={(e)=>setLastName(e.target.value)}/>
        </div>
        <div>
          <input type="email" placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
          <input type="number" placeholder='Phone Number' value={phone} onChange={(e)=>setPhone(e.target.value)}/>
        </div>
        <div>
          <input type="number" placeholder='NIC' value={nic} onChange={(e)=>setNic(e.target.value)}/>
          <input type="date" placeholder='DOB' value={dob} onChange={(e)=>setDob(e.target.value)}/>
        </div>
        <div>
          <select value={gender} onChange={(e)=>setGender(e.target.value)}>
             <option value="">Select Gender</option>
             <option value="Male">Male</option>
             <option value="Female">Female</option>
          </select>
          <input type="password" placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
        </div> 
        <div style={{gap:"10px", justifyContent:"flex-end",flexDirection:"row"}} >
              <p style={{marginBottom:0}}>Already Registered?</p>
              <Link to={'/login'} style={{textDecoration:"none",alignItems:"center"}}>Login Now</Link>
          </div>
          <div style={{justifyContent:"center",alignItems:"center"}}>
             <button type="submit">Register</button>
          </div>
      </form>
    </div>
  )
}

export default Register
