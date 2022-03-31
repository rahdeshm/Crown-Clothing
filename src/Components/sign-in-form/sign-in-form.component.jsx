import { useState,useContext } from "react";
import {createAuthUserWithEmailAndPassword,createUserDocumentFromAuth,signInWithGooglePopup,signInAuthUserWithEmailAndPassword} from'../../utils/firebase.utils';
import FormInput from "../form-input/form-input.component";
import { UserContext } from "../../contexts/userContext";
import './sign-in-form.styles.scss';
import Button from "../button/button.component";

const defaultFormFields={
      email:'',
      password:''
    };
const SignInForm=()=>{ 
  
    const[formFields,setFromFields]=useState(defaultFormFields);
    const{email,password}=formFields;
    const {setCurrentUser} =useContext(UserContext)
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
    const signInWithGoogle = async() => {
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user)
    }
    const handleSubmit= async(event)=>{
       event.preventDefault();    
       try{
          const {user}=await signInAuthUserWithEmailAndPassword(email,password);
          setCurrentUser(user)
          resetFields()
       }
       catch(error){
         switch(error.code){
           case 'auth/wrong-password':
             alert('incorrect password for email');
             break;
           case "auth/user-not-found":
            alert('no user is associated with this email');
            break;
            default:
              console.log(error)
          }
         }
    }


    return(
        <div className="sign-up-container">
         <h2>Already have an account?</h2>
         <span>Sign in with your email and password</span>
           <form onSubmit={handleSubmit}>             
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
             <div className="buttons-container">
               <Button buttonType='default' type="submit">Sign In</Button>
               <Button type='button'  buttonType='google' onClick={signInWithGoogle}>Google sign in</Button>
            </div>            
           </form>
        </div>
    )
}

export default SignInForm