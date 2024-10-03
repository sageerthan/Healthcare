import React from 'react'

const Biography = ({imageUrl}) => {
  return (
    <div className="container biography">
      <div className='banner'>
        <img src={imageUrl} alt="About"/>
      </div>
      <div className='banner'>
        <h2>Biography</h2>
        <h3>Our Mission</h3>
        <p>
        At HealthCare, we are dedicated to transforming the way healthcare is accessed and delivered. 
        Our mission is to provide a seamless, convenient, and reliable platform that connects patients 
        with qualified healthcare professionals, ensuring everyone receives the care they need, when they need it.
        </p>
        <h3>Our Vision</h3>
        <p>
        We envision a world where healthcare is accessible to all, regardless of location or circumstance.
        By leveraging technology, we aim to bridge the gap between patients and healthcare providers,
        making it easier to book appointments, access medical advice, and manage health records.
        </p>
        <h3>Our Story</h3>
        <p>
        Founded in 2018, HealthCare was created to address the challenges of traditional healthcare access. 
        With long wait times, limited availability of specialists, and geographical barriers, we saw an opportunity to improve the patient experience. 
        Our founders, bring a wealth of experience in healthcare and technology, united by a common goal: to make healthcare more accessible and patient-centered.
        </p>
      </div>

    </div>
  )
}

export default Biography