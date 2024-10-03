import React, { useContext, useState } from 'react';
import { StoreContext } from '../context/StoreContext';
import {useNavigate} from 'react-router-dom';
import { IoHome } from "react-icons/io5";
import { TbLogout2 } from "react-icons/tb";
import { BiMessageDetail } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import {FaUserDoctor} from "react-icons/fa6";
import { MdAdminPanelSettings } from "react-icons/md";
import {IoPersonAddSharp} from "react-icons/io5";
import axios from "axios";
import {toast} from "react-toastify";

const Sidebar = () => {
    const[show,setShow]=useState(false);
    const {url,setIsAuthenticated,token} = useContext(StoreContext);
    const navigate=useNavigate();

    const gotoHome =()=>{
      navigate("/");
      setShow(!show);
    }
    const gotoDoctorsPage =()=>{
      navigate("/doctors");
      setShow(!show);
    }
    const gotoMessages =()=>{
      navigate("/messages");
      setShow(!show);
    }
    const gotoAddNewDoctor =()=>{
      navigate("/doctor/addnew");
      setShow(!show);
    }
    const gotoAddNewAdmin =()=>{
      navigate("/admin/addnew");
      setShow(!show);
    }

    const handleLogout=async()=>{
      try{
       await axios.get(`${url}/api/v1/user/admin/logout`,{withCredentials:true}).then(res=>{
          toast.success(res.data.message);
          localStorage.removeItem('token');
          setIsAuthenticated(false);
          navigate("/login");
          
       });
      }catch(error){
         toast.error(error.response.data.message);
      }
    }

  return (
    <>
    <nav style={!token ? {display:'none'}:{display:'flex'}} className={show ? "show sidebar" : "sidebar"}>
        <div className='links'>
          <IoHome onClick={gotoHome}/>
          <FaUserDoctor onClick={gotoDoctorsPage}/>
          <MdAdminPanelSettings onClick={gotoAddNewAdmin}/>
          <IoPersonAddSharp  onClick={gotoAddNewDoctor}/>
          <BiMessageDetail onClick={gotoMessages}/>
          <TbLogout2 onClick={handleLogout}/>
        </div>
    </nav>
    <div className="wrapper" style={!token ? {display:"none"}:{display:"flex"}}>
        <GiHamburgerMenu className='hamburger' onClick={()=>setShow(!show)}/>
    </div>
    </>
  )
}

export default Sidebar