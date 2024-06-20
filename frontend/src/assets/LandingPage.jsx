import React from 'react'
import './Landingcss.css'
import { Link } from 'react-router-dom'

function LandingPage() {
  return (
    <>
      <div className='landing container-fluid'>
        <div className='purpleCircle'></div>
        <div className='pink'></div>
        <div  className='yellow'></div>
      <nav>
        <p className='brandname'>LOGO</p>
        <button className='loginBtn button'><span><Link to='/login' style={{textDecoration: 'none', color: '#fff'}}>Login</Link></span></button>
      </nav>
      <div className='center'>
        <div className='txt-container'>
            <h2>E-commerce in your pocket</h2>
            <h4>Contact us for detailed information</h4>
            <h4>you can contact.</h4>
        </div>
        <div className='img-container'>

            <img  className='img1' src="https://media-public.canva.com/8PAt8/MAEr8F8PAt8/1/s.png" alt="" />
            <img  className='img2' src="https://media-public.canva.com/7xr0A/MAE19o7xr0A/1/s.png" alt="" />
            <div className='orange'></div>
            
        </div>

      </div>




      </div>
    </>
  )
}

export default LandingPage
