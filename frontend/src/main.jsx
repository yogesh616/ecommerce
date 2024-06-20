// main.jsx
import React, { useContext, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Login from './Routes/Login.jsx';
import Profile from './Routes/Profile.jsx';
import { AuthProvider, AuthContext } from './Context/Context.jsx';
import PrivateRoute from './Routes/PrivateRoute.jsx';
import Register from './Routes/Register.jsx';


function RedirectToProfileIfAuthenticated() {
  const { isAuthenticated, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && user) {
      navigate('/profile');
    }
  }, [isAuthenticated, user, navigate]);

  return null;
}

function Main() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <RedirectToProfileIfAuthenticated />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Main />);
