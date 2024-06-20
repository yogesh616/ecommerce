import React, { useState } from 'react'
import '../App.css'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Register() {
    const [userName, setUserName] = useState('') 
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [fullName, setFullName] = useState('')
    
    const[isHide, setIsHide] = useState(true)

    function handleHide() {
        setIsHide(!isHide)
    }

    const handleSubmit = async () => {
        try {
            const res = await axios.post('http://localhost:3000/register', {
                userName,
                password,
                email,
                fullName
            })
            console.log(res.data);
        }
        catch (err) {
            console.log(err.response.data);
        }
    }

  return (
    <>
      <div className="container m-auto box text-center">
        <h1 className='mb-5 mt-2'>Register</h1>
        <div className="d-flex align-items-center justify-content-center flex-column gap-4">
         <div className="inputs">
          <label><i className="fa-solid fa-user"></i></label>
          <input placeholder='Your Full name' type='text' value={fullName} onChange={(e)=> setFullName(e.target.value)}  required/>
         </div>
         <div className="inputs">
          <label><i className="fa-solid fa-user-tie"></i></label>
          <input placeholder='Your User name' type='text' value={userName} onChange={(e)=> setUserName(e.target.value)} required/>
         </div>
         <div className="inputs">
          <label><i className="fa-solid fa-envelope"></i></label>
          <input placeholder='Your Email' type='email' value={email} onChange={(e)=> setEmail(e.target.value)} required/>
         </div>
         <div className="inputs eye">
          <label><i className="fa-solid fa-lock"></i></label>
          <input placeholder='Your Password' type={isHide ? 'password': 'text'} value={password} onChange={(e)=> setPassword(e.target.value)} required/>
          <i className={`fa-regular &{isHide ? ' fa-eye' : ' fa-eye-slash'}}`}  onClick={handleHide}></i>
         </div>
         <button className='btn btn-primary w-50' onClick={handleSubmit}>Submit</button>

         <div className="d-flex align-items-center justify-content-center">
          <p>Already have an account? <Link to='/login' style={{marginBottom: '10px'}}>Login</Link></p>
          
          </div>
 
          

        </div>
      </div>
    </>
  )
}

export default Register
