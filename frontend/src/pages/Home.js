import React from 'react'
import Hero from '../components/Hero'
import Biography from '../components/Biography'
import Departments from '../components/Departments'
import MessageForm from '../components/MessageForm'

const Home = () => {
  return (
    <>
     <Hero title={'Welcome To HealthCare Medical Center | Your Trusted Medical Center'} imageUrl={"/heros.png"}/>
     <Biography imageUrl={"/about.png"}/>
     <Departments/>
     <MessageForm/>
    </>
  )
}

export default Home
