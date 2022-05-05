import { useState } from "react";
import {createAuthUserWithEmailAndPassword,createUserDocumentFromAuth} from'../../utils/firebase.utils';
import FormInput from "../form-input/form-input.component";
import './sign-up-form.styles.scss';
import Button,{BUTTON_TYPE_CLASSES} from "../button/button.component";
import { useDispatch } from "react-redux";
import { signUpStart } from "../../store/user/user.action";

const SignUpForm=()=>{ 
    const defaultFormFields={
      displayName:'',
      email:'',
      password:'',
      confirmPassword:''
    };
    
    const[formFields,setFromFields]=useState(defaultFormFields);
    const{displayName,email,password,confirmPassword}=formFields;
    const dispatch=useDispatch();
    const handleChange=(event)=>{
        const {name,value}=event.target;
        setFromFields({
            ...formFields,
            [name]:value
        })
    }
    const resetFields=()=>{
        setFromFields(defaultFormFields)
    }
    const handleSubmit= async(event)=>{
  
       event.preventDefault();
       if(password!==confirmPassword){
           alert('Password do not match')
           return
       }

       try{
        //  const {user}= await createAuthUserWithEmailAndPassword(email,password)
        //  await createUserDocumentFromAuth(user,{displayName}
        // )
        dispatch(signUpStart(email,password,displayName))        
          resetFields()        
       }
       catch(error){
           if(error.code==='auth/email-already-in-use'){
               alert('Can not create user email is already in use')
           }
           console.log(error)
       }
    }

console.log(formFields)
    return(
        <div className="sign-up-container">
         <h2>Don't have an account?</h2>
         <span>Sign up with your email and password</span>
           <form onSubmit={handleSubmit}>
             <FormInput
                label="Display Name"
                type="text" 
                required 
                onChange={handleChange} 
                name="displayName" 
                value={displayName}
              />

             <FormInput
                label="Email"
                type="email" 
                required 
                onChange={handleChange} 
                name="email"  
                value={email}
              />

             <FormInput
                label="Password"
                type="password"
                required 
                onChange={handleChange} 
                name="password"
                value={password}
              />

             <FormInput
                label="Confirm Password"
                type="password" 
                required 
                onChange={handleChange} 
                name="confirmPassword"
                value={confirmPassword}
              />
              <Button 
              buttonType={BUTTON_TYPE_CLASSES.InvertedButton}
              type='submit'>
              sign up
              </Button>
             
           </form>
        </div>
    )
    // <Button buttonType='default' type="submit">Sign Up</Button>
}

export default SignUpForm