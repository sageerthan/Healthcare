import { createContext,useEffect,useState } from "react";

export const StoreContext=createContext({});

export const StoreContextProvider=(props)=>{
  const url='http://localhost:8000';
  const [isAuthenticated,setIsAuthenticated]=useState(false);
  const [token,setToken]=useState('');
  const [user,setUser]=useState({});

  useEffect(()=>{
     async function loadData(){
       if(localStorage.getItem('token')){
          setToken(localStorage.getItem('token'));
          setIsAuthenticated(true);
       }
     }
     loadData();
  },[isAuthenticated,token])

  return(
    <StoreContext.Provider value={{isAuthenticated,setIsAuthenticated,user,setUser,token,setToken,url}} >
      {props.children}
    </StoreContext.Provider>
  )
}