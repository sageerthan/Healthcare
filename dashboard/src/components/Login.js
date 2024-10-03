import React,{useContext, useState} from 'react';
import { StoreContext } from '../context/StoreContext';
import { Navigate, useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';
import axios from 'axios';


const Login = () => {
  const {url,isAuthenticated,setIsAuthenticated,setToken} =useContext(StoreContext);
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
          `${url}/api/v1/user/login`,
          { email, password, role: "Admin" },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          toast.success(res.data.message);
          setToken(res.data.token);
          localStorage.setItem('token',res.data.token);
          setIsAuthenticated(true);
          navigate("/");
          setEmail("");
          setPassword("");
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <section className="container form-component">
        <img src="/logo.png" alt="logo" className="logo" style={{width:"100px",height:"100px",marginBottom:"10px"}}/>
        <h1 className="form-title">WELCOME TO HEALTHCARE</h1>
        <p>Only Admins Are Allowed To Access These Resources!</p>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div style={{ justifyContent: "center", alignItems: "center" }}>
            <button type="submit">Login</button>
          </div>
        </form>
      </section>
    </>
  );
};
export default Login