import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from "../context/StoreContext"
import { Navigate } from "react-router-dom"
import axios from 'axios'
import { toast } from 'react-toastify'
import {GoCheckCircleFill} from "react-icons/go"
import {AiFillCloseCircle} from "react-icons/ai"
import { RiCalendarScheduleFill } from "react-icons/ri";
import { FaUserDoctor } from "react-icons/fa6";
const Dashboard = () => {
  const { token, url, admin } = useContext(StoreContext);
  const [appointments, setAppointments] = useState([]);
  const[doctors,setDoctors]=useState([]);
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data } = await axios.get(`${url}/api/v1/appointment/getall`, {
          withCredentials: true
        });
        const response=await axios.get(`${url}/api/v1/user/doctors`,{
          withCredentials:true
        });
        setDoctors(response.data.doctors);
        setAppointments(data.appointments)
      } catch (error) {
        toast.error(error.response.data.message)
      }
    }
    fetchAppointments()
  }, [url])

  const handleUpdateStatus=async(appointmentId,status)=>{
    try{
      const {data}=await axios.put(`${url}/api/v1/appointment/updatestatus/${appointmentId}`,
        {status},
        {withCredentials:true}
      );
      setAppointments((prevAppointments)=>prevAppointments.map((appointment)=>
        appointment._id === appointmentId ? {...appointment,status}:appointment
      ))
      toast.success(data.message)
    }catch(error){
      toast.error(error.response.data.message)
    }
  }
  if (!token) {
    return <Navigate to={"/login"} />;
  }
  return (
    <>
    <section className="dashboard page">
      <div className='banner'>
        <div className='firstBox'>
          <img src="/doc.png" alt="doctorImg"/>
          <div className='content'>
            <div>
              <p>Hello,</p>
              <h5>
               {admin && `${admin.firstName} ${admin.lastName}`}
              </h5>
            </div>
            <p>
            This is your centralized hub for managing all key operations efficiently
            </p>
          </div>
        </div>
        <div className="secondBox">
          <p>Total Appointments <RiCalendarScheduleFill /></p>
          <h3 style={{textAlign:"center"}}>{appointments.length}</h3>
        </div>
        <div className="thirdBox">
          <p>Registered Doctors <FaUserDoctor /></p>
          <h3  style={{textAlign:"center"}}>{doctors.length}</h3>
        </div>
      </div>
      <div className="banner">
        <h5>Appointments</h5>
        <table>
          <thead>
            <tr>
              <th>Patient</th>
              <th>Date</th>
              <th>Doctor</th>
              <th>Department</th>
              <th>Status</th>
              <th>Visited</th>
            </tr>
          </thead>
          <tbody>
            {
              appointments && appointments.length > 0 ?(
                appointments.map(appointment=>{
                  return(
                    <tr key={appointment._id}>
                       <td>{`${appointment.firstName} ${appointment.lastName}`}</td>
                       <td>{appointment.appointment_date.substring(0,10)}</td>
                       <td>{`${appointment.doctor.firstName} ${appointment.doctor.lastName}`}</td>
                       <td>{appointment.department}</td>
                       <td>
                       <select className={
                        appointment.status ==="Pending" ? "value-pending":
                        appointment.status ==="Rejected"? "value-rejected":"value-accepted"
                       } value={appointment.status} onChange={(e)=>handleUpdateStatus(appointment._id,e.target.value)}>
                         <option value="Pending" className='value-pending'>Pending</option>
                         <option value="Accepted" className='value-accepted'>Accepted</option>
                         <option value="Rejected" className='value-rejected'>Rejected</option>
                       </select>
                       </td>
                       <td>{appointment.hasVisited === true ? <GoCheckCircleFill className="green"/>:<AiFillCloseCircle className="red"/>}</td>
                    </tr>
                  )
                })
              ):<h1>No Appointments!</h1>
            }
          </tbody>
        </table>
      </div>
    </section>
    </>
  )
}

export default Dashboard