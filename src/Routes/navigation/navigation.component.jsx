import {Routes,Route, Outlet,Link} from 'react-router-dom';
import { Fragment,Context } from 'react';
import {ReactComponent as CrownLogo} from '../../assets/crown.svg'
import './navigation.styles.scss';
import { UserContext } from "../../contexts/userContext";
import { useContext } from 'react';
import {signOutUser} from '../../utils/firebase.utils'

const Navigation=()=>{
   const {currentUser,setCurrentUser}=useContext(UserContext);
   const signOutHandler=async ()=>{
     const res=await signOutUser();
     setCurrentUser(null)
     console.log(res)
   }
    return (
      <Fragment>
        <div className='navigation'>
           <Link className='logo-container' to='/'>
              <CrownLogo className='logo'/>
           </Link>
          
          <div className="nav-links-container">
            <Link className='nav-link' to='/shop'>
            SHOP
            </Link>
            {
              currentUser?
                <span className='nav-link' onClick={signOutHandler}>SIGN OUT</span>
              : (<Link className='nav-link' to='/auth'>
            SIGN-IN
            </Link>)
            }
            
          </div> 
        </div>
        <Outlet/>
      </Fragment>
    )
  }

export default Navigation  