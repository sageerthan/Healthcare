import React from 'react'
import AppointmentForm from '../components/AppointmentForm'
import Hero from '../components/Hero'
const Appointment = () => {
  return (
   <>
    <Hero title={"Schedule Your Application | HealthCare Medical Center"} imageUrl={"appointment.png"}/>
    <AppointmentForm/>
   </>
   
  )
}

export default Appointment