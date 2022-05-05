import {Routes,Route, Outlet} from 'react-router-dom'
import Home from './Routes/home/home.component';
import {useDispatch} from 'react-redux';
import Navigation from './Routes/navigation/navigation.component'
import Authentication from './Routes/authentication/authentication.component'
import Shop from './Routes/shop/shop.component'
import Checkout from './Routes/checkout/checkout.component'
import {onAuthStateChangedListner,createUserDocumentFromAuth,getCurrentUser} from '../src/utils/firebase.utils'
import { useState,useEffect,useReducer } from "react";
import { setCurrentUser,checkUserSession } from './store/user/user.action';

const App=()=>{
  const dispatch=useDispatch();
  
  // useEffect(()=>{
  //   const unsubscribe=onAuthStateChangedListner((user)=>{
  //   console.log(user)
  //   if(user){
  //      createUserDocumentFromAuth(user)
  //   }
  //  dispatch(setCurrentUser(user))
  // });
  //   return unsubscribe;
  // },[dispatch]);
    useEffect(()=>{
      // getCurrentUser().then((user)=>console.log(user))
      dispatch(checkUserSession())
    },[]);

  return (
    <Routes>
       <Route path='/' element={ <Navigation/>}>
          <Route index element={ <Home/>}/>
          <Route path='shop/*' element={<Shop/>}/>
          <Route path='auth' element={<Authentication/>}/>
          <Route path='checkout' element={<Checkout/>}/>
       </Route>
    </Routes>
   
  )
}

export default App