import { useState } from "react";
import { useEffect } from "react";
import { createContext, useContext } from "react";
import {onAuthStateChangedListner,signOutUser} from '../utils/firebase.utils'
export const UserContext = createContext({
  setCurrentUser:()=>null, 
  currentUser:null,
    

});

export const UserProvider=({children})=>{
    const [currentUser,setCurrentUser]=useState(null);
    const value={currentUser,setCurrentUser}

    useEffect(()=>{
    
      const unsubscribe=onAuthStateChangedListner((user)=>{
          console.log(user)
      });
      return unsubscribe;
    },[]);

    return <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
}

