import React from 'react'
import Hero from "../components/Hero"
import Biography from "../components/Biography"
const AboutUs = () => {
  return (
    <>
      <Hero title={"Learn More About Us | HealthCare Medical Center"} imageUrl={"/aboutus.png"}/>
      <Biography imageUrl={"/biography.png"}/>
    </>
  )
}

export default AboutUs