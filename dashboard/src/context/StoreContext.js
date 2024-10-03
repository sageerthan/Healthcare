import { createContext, useState, useEffect } from "react";
import axios from 'axios';
export const StoreContext=createContext({isAuthenticated:false});

export const StoreContextProvider =({children})=>{
    const [isAuthenticated,setIsAuthenticated]=useState(false);
    const[token,setToken]=useState('');
    const [admin,setAdmin]=useState({});
    const url='http://localhost:8000';

    useEffect(()=>{
        async function loadData(){
          if(localStorage.getItem('token')){
             setToken(localStorage.getItem('token'));
             setIsAuthenticated(true);

            /* try{
                const response=await axios.get(`${url}/api/v1/admin/mydetails`,{withCredentials:true});
                setAdmin(response.data.user);
             }catch(error){
                console.error("Error fetching admin data:", error.response.data.message);
                setAdmin({})
        }*/
             }
          }
        loadData();
     },[isAuthenticated,token,url])
   

return(
    <StoreContext.Provider value={{isAuthenticated,setIsAuthenticated,admin,setAdmin,token,setToken,url}}>
        {children}
    </StoreContext.Provider>
)
}
