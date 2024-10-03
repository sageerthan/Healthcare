import React, { useContext, useState } from 'react';
import axios from 'axios';
import {toast} from 'react-toastify';
import { StoreContext } from '../context/StoreContext';

const MessageForm = () => {
  const[firstName,setFirstName]=useState('');
  const[lastName,setLastName]=useState('');
  const[email,setEmail]=useState('');
  const[phone,setPhone]=useState('');
  const[message,setMessage]=useState('');
  const {url}=useContext(StoreContext);
  const submitHandler=async(e)=>{
    e.preventDefault();
    try{
     await axios.post(`${url}/api/v1/message/send`,{firstName,lastName,email,phone,message},{
      withCredentials:true,
      headers:{
        "Content-Type":"application/json"
      }
     }).then((res)=>{
       toast.success(res.data.message);
       setFirstName("");
       setLastName("");
       setEmail("");
       setPhone("");
       setMessage("");
     })
    }
    catch(error){
       toast.error(error.response.data.message)
    }

  }
  return (
    <div className="container form-component message-form">
      <h2>Send us a message</h2>
      <form onSubmit={submitHandler}>
        <div>
          <input type="text" placeholder='First Name' value={firstName} onChange={(e)=>setFirstName(e.target.value)}/>
          <input type="text" placeholder='Last Name' value={lastName} onChange={(e)=>setLastName(e.target.value)}/>
        </div>
        <div>
          <input type="email" placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
          <input type="text" placeholder='Phone Number' value={phone} onChange={(e)=>setPhone(e.target.value)}/>  
        </div>
        <textarea rows={7} placeholder='Message' value={message} onChange={(e)=>setMessage(e.target.value)}/>
         <div style={{justifyContent:"center",alignItems:"center"}}>
          <button type="submit">Send</button>
         </div>
      </form>
    </div>
  )
}

export default MessageForm