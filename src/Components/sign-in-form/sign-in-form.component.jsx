import { useState,useContext } from "react";
import {createAuthUserWithEmailAndPassword,createUserDocumentFromAuth,signInWithGooglePopup,signInAuthUserWithEmailAndPassword} from'../../utils/firebase.utils';
import FormInput from "../form-input/form-input.component";
import './sign-in-form.styles.scss';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import { useDispatch } from "react-redux";
import { googleSignInStart,emailSignInStart } from "../../store/user/user.action";
const defaultFormFields={
      email:'',
      password:''
    };
const SignInForm=()=>{ 

    const[formFields,setFromFields]=useState(defaultFormFields);
    const{email,password}=formFields;
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
    const signInWithGoogle = async() => {
        //  await signInWithGooglePopup();
        dispatch(googleSignInStart())
    }
    const handleSubmit= async(event)=>{
      
       event.preventDefault();    
       try{
          // const {user}=await signInAuthUserWithEmailAndPassword(email,password);   
          dispatch(emailSignInStart(email,password))
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
        <div className="sign-in-container">
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
              <div className='buttons-container'>
          <Button type='submit'>Sign In</Button>
          <Button
            buttonType={BUTTON_TYPE_CLASSES.google}
            type='button'
            onClick={signInWithGoogle}
          >
            Sign In With Google
          </Button>
        </div>           
           </form>
        </div>
    )
}

export default SignInForm

