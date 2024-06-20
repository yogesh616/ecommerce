import React, { useState, useContext } from 'react';
import '../App.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../Context/Context.jsx';
import Back from './Back.jsx';

function Login() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isHide, setIsHide] = useState(true);

  const { setIsAuthenticated, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleHide() {
    setIsHide(!isHide);
  }

  async function handleLogin() {
    try {
      const response = await axios.post('http://localhost:3000/login', {
        userName,
        password,
      }, { withCredentials: true }); // Include cookies in the request
      if (response.data.token) {
        const { user } = response.data;
        setUser(user);
        setIsAuthenticated(true);
        toast.success(`Welcome ${user.fullName}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        navigate('/profile');
        localStorage.setItem('token', response.data.token);
      }
    } catch (error) {
      console.log(error.response.data);
      toast.error('Invalid credentials', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

  return (
    <>
      <Back />
      <div className="container m-auto box text-center">
        <h1 className='mb-5 mt-2'>Login</h1>
        <div className="d-flex align-items-center justify-content-center flex-column gap-4">
          <div className="inputs">
            <label><i className="fa-solid fa-user-tie"></i></label>
            <input placeholder='Your User name' type='text' value={userName} onChange={(e) => setUserName(e.target.value)} />
          </div>
          <div className="inputs eye">
            <label><i className="fa-solid fa-lock"></i></label>
            <input placeholder='Your Password' type={isHide ? 'password' : 'text'} value={password} onChange={(e) => setPassword(e.target.value)} />
            <i className={`fa-regular ${isHide ? 'fa-eye' : 'fa-eye-slash'}`} onClick={handleHide}></i>
          </div>
          <button className='btn btn-primary w-50' onClick={handleLogin}>Submit</button>
          <div className="d-flex align-items-center justify-content-center">
            <p>Not a member? <Link to='/register' style={{ marginBottom: '10px' }}>Register</Link></p>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default Login;
