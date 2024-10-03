import React, { useContext, useEffect } from 'react'
import './App.css';
import { StoreContext} from './context/StoreContext';
import {Routes,Route} from 'react-router-dom';
import Home from './pages/Home';
import Appointment from './pages/Appointment';
import AboutUs from './pages/AboutUs';
import Login from './pages/Login';
import Register from './pages/Register';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import axios from 'axios';
import Footer from './components/Footer';

function App() {
  const {url,isAuthenticated,setIsAuthenticated,setUser}=useContext(StoreContext);
  useEffect(()=>{
    const fetchUser=async()=>{
      try{
        const response=await axios.get(`${url}/api/v1/patient/mydetails`,{withCredentials:true});
        setIsAuthenticated(true);
        setUser(response.data.user);  
      }
      catch(error){
        setIsAuthenticated(false);
        setUser({})
      }
    };
    fetchUser();
  },[isAuthenticated]);
  return (
    <div className="App">
        <Navbar/> 
        <ToastContainer theme='colored' position='top-center'/>
         <Routes>
           <Route path='/' element={<Home/>}/>
           <Route path='/appointment' element={<Appointment/>}/>
           <Route path='/about' element={<AboutUs/>}/>
           <Route path='/register' element={<Register/>}/>
           <Route path='/login' element={<Login/>}/>
         </Routes>  
         <Footer/>
    </div>
  );
}

export default App;
