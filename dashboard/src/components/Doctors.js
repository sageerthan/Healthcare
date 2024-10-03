import React, { useContext,useState,useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { StoreContext } from '../context/StoreContext'
import {toast} from 'react-toastify'
import axios from 'axios'
const Doctors = () => {
  const[doctors,setDoctors]=useState([]);
  const {token,url}=useContext(StoreContext);

  useEffect(()=>{
    const fetchDoctors =async()=>{
      try{
        const {data}=await axios.get(`${url}/api/v1/user/doctors`,{withCredentials:true});
        setDoctors(data.doctors);
      }catch(error){
        toast.error(error.response.data.message);
      }
    }
    fetchDoctors();
  },[]);
  if(!token){
    return <Navigate to ={"/login"}/>
  }
  return (
    <>
      <section className="page doctors">
        <h1>Doctors</h1>
        <div className="banner">
          {
             doctors && doctors.length > 0 ?(doctors.map(element=>{
               return(
                <div className="card">
                   <img src={element.docAvatar && element.docAvatar.url} alt="Doctor Avatar"/>
                   <h4>{`${element.firstName} ${element.lastName}`}</h4>
                <div className="details">
                  <p>
                    Email: <span>{element.email}</span>
                  </p>
                  <p>
                    Phone: <span>{element.phone}</span>
                  </p>
                  <p>
                    DOB: <span>{element.dob.substring(0, 10)}</span>
                  </p>
                  <p>
                    Department: <span>{element.doctorDepartment}</span>
                  </p>
                  <p>
                    NIC: <span>{element.nic}</span>
                  </p>
                  <p>
                    Gender: <span>{element.gender}</span>
                  </p>
                </div>
                </div>
               )
             })):<h1>No Registered Doctors Found!</h1>
          }
        </div>

      </section>
    </>
  )
}

export default Doctors