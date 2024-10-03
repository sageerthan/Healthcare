import React, { useContext, useState, useEffect } from 'react'
import { StoreContext } from '../context/StoreContext';
import axios from "axios";
import { Navigate } from 'react-router-dom';
const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { token, url } = useContext(StoreContext);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await axios.get(`${url}/api/v1/message/getmessages`, { withCredentials: true });
        setMessages(data.messages);
      }
      catch (error) {
        console.log("Error occured while fetching messages:", error);
      }
    };
    fetchMessages();
  }, []);

  if (!token) {
    return <Navigate to={"/login"} />;
  }
  return (
    <section className='page messages'>
      <h1>Messages</h1>
      <div className='banner'>
        {
          messages && messages.length > 0 ? (messages.map((element) => {
            return (
              <div className="card">
                <div className="details">
                  <p>First Name:<span>{element.firstName}</span></p>
                  <p>Last Name:<span>{element.lastName}</span></p>
                  <p>Email:<span>{element.email}</span></p>
                  <p>Phone:<span>{element.phone}</span></p>
                  <p>Message:<span>{element.message}</span></p>
                </div>
              </div>
                ) 
          })):(<h1>No Messages!</h1>)
        }
      </div>
    </section>
  )
}

export default Messages