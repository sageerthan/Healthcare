import React, { useContext } from 'react';
import { useState } from 'react';
import { StoreContext } from '../context/StoreContext';
import {useNavigate, Link,Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
    const [show,setShow]=useState(false);
    const {url,isAuthenticated,setIsAuthenticated,token}=useContext(StoreContext);
    const navigate=useNavigate();

    const handleLogout=async()=>{
      try{
       await axios.get(`${url}/api/v1/user/patient/logout`,{withCredentials:true}).then(res=>{
          toast.success(res.data.message);
          localStorage.removeItem('token');
          setIsAuthenticated(false);
          
       });
      }catch(error){
         toast.error(error.response.data.message);
      }
    }
    const handleLogin=()=>{
      navigate('/login');
    }
  return (
    <nav className="container">
        <div className="logo"><Link to="/" style={{textDecoration:"none"}}><img src="logo.png" alt="HealthCare" className='logo-img'/></Link></div>
        <div className={show ? "navLinks showmenu" : "navLinks"}>
           <div className="links">
              <Link to={'/'}>Home</Link>
              <Link to={'/appointment'}>Appointment</Link>
              <Link to={'/about'}>About Us</Link>
           </div>
           {token ? (<button className='logoutBtn btn' onClick={handleLogout}>Logout</button>):(<button className='loginBtn btn' onClick={handleLogin}>Login</button>)}
        </div>
        <div className='hamburger' onClick={()=>setShow(!show)}>
             <GiHamburgerMenu/>
        </div>
    </nav>
  )
}

export default Navbar