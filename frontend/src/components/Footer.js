import React from 'react'
import { Link } from 'react-router-dom';
import { FaLocationDot,FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const Footer = () => {
    const hours = [
        {
          id: 1,
          day: "Monday",
          time: "9:00 AM - 11:00 PM",
        },
        {
          id: 2,
          day: "Tuesday",
          time: "08:00 AM - 10:00 PM",
        },
        {
          id: 3,
          day: "Wednesday",
          time: "10:00 AM - 10:00 PM",
        },
        {
          id: 4,
          day: "Thursday",
          time: "9:00 AM - 9:00 PM",
        },
        {
          id: 5,
          day: "Friday",
          time: "3:00 PM - 9:00 PM",
        },
        {
          id: 6,
          day: "Saturday",
          time: "9:00 AM - 3:00 PM",
        },
      ];
    
  return (
    <>
    <footer className='container'>
        <hr/>
        <div className='content'>
            <div>
                <img src="logo.png" alt="HealthCare" className='logo-img'/>
            </div>
            <div>
            <h4>Quick Links</h4>
            
            <ul>
                <Link to={'/'}>Home</Link>
                <Link to={'/appointment'}>Appointment</Link>
                <Link to={'/about'}>About</Link>
            </ul>
            </div>
            <div>
            <h4>Hours</h4>
            <ul>
              {hours.map((element) => (
                <li key={element.id}>
                  <span>{element.day}</span>
                  <span>{element.time}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <div>
              <FaPhone />
              <span>+94 773456894</span>
            </div>
            <div>
              <MdEmail />
              <span>healthcare@gmail.com </span>
            </div>
            <div>
              <FaLocationDot /> 
              <span>Nallur,Jaffna</span>
            </div>
          </div>
        </div>
    </footer></>
  )
}

export default Footer