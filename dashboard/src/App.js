import React, { useContext, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import AddNewDoctor from './components/AddNewDoctor';
import AddNewAdmin from './components/AddNewAdmin';
import Messages from './components/Messages';
import Doctors from './components/Doctors';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { StoreContext } from './context/StoreContext';
import axios from 'axios';
import Sidebar from './components/Sidebar';
import "./App.css";

const App = () => {
  const {url,isAuthenticated,setIsAuthenticated,setAdmin} =useContext(StoreContext);
  useEffect(()=>{
    const fetchUser=async()=>{
      try{
        const response=await axios.get(`${url}/api/v1/user/admin/mydetails`,{withCredentials:true});
        setIsAuthenticated(true);
        setAdmin(response.data.user);  
      }
      catch(error){
        setIsAuthenticated(false);
        setAdmin({})
      }
    };
    fetchUser();
  },[isAuthenticated]);
  return (
    <>
    <ToastContainer theme='colored' position='top-center'/>
      <Router>
        <Sidebar/>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/doctor/addnew" element={<AddNewDoctor />} />
          <Route path="/admin/addnew" element={<AddNewAdmin />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/doctors" element={<Doctors />} />
        </Routes>
      </Router>
    </>
  )
}

export default App