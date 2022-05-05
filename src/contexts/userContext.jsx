import { useState,useEffect,useReducer } from "react";
import { createContext, useContext } from "react";
import {onAuthStateChangedListner,createUserDocumentFromAuth} from '../utils/firebase.utils'
export const UserContext = createContext({
  setCurrentUser:()=>null, 
  currentUser:null,
});

export const USER_ACTION_TYPES={
  SET_CURRENT_USER:'SET_CURRENT_USER'
}

const userReducer=(state,action)=>{
  console.log('dispatched')
  console.log(action)
   const {type,payload}=action;
   switch(type){
    case USER_ACTION_TYPES.SET_CURRENT_USER:
     return {
      ...state,
      currentUser:payload
     }
    default :
    throw new Error(`Unhandled type ${type} in useReducer`)
   }
}

const INITIAL_STATE={
  currentUser:null
}

export const UserProvider=({children})=>{
    // const [currentUser,setCurrentUser]=useState(null);
    const  [{currentUser},dispatch]=useReducer(userReducer,INITIAL_STATE);
    console.log(currentUser)

    const setCurrentUser=(user)=>{
      dispatch({type:USER_ACTION_TYPES.SET_CURRENT_USER,payload:user})
    }
    const value={currentUser,setCurrentUser}

    useEffect(()=>{
      
      const unsubscribe=onAuthStateChangedListner((user)=>{
      console.log(user)
      if(user){
         createUserDocumentFromAuth(user)
      }
      setCurrentUser(user)
    });
      return unsubscribe;
    },[]);
    return <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
}

