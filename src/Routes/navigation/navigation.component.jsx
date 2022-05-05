import {Routes,Route, Outlet,Link} from 'react-router-dom';
import { Fragment,Context,useContext } from 'react';
import {ReactComponent as CrownLogo} from '../../assets/crown.svg';
import {useSelector,useDispatch} from 'react-redux'
import {NavigationContainer,NavLink,NavLinks,LogoContainer} from './navigation.styles';
import { CartContext } from "../../contexts/cart.context";
// import {signOutUser} from '../../utils/firebase.utils'
import CartIcon from '../../Components/cart-icon/cart-icon.component';
import CartDropdown from '../../Components/cart-dropdown/cart-dropdown.component';
import { selectCurrentUser } from '../../store/user/user.selector';
import { selectIsCartOpen } from '../../store/cart/cart.selector';
import { signOutStart } from '../../store/user/user.action';

const Navigation=()=>{
  const currentUser=useSelector(selectCurrentUser);
  const isCartOpen=useSelector(selectIsCartOpen);
  const dispatch=useDispatch();
  //  const {isCartOpen}=useContext(CartContext);
  const signOutUser=()=>dispatch(signOutStart())
   console.log('nav',currentUser)
    return (
      <Fragment>
        <NavigationContainer>
          <LogoContainer to='/'>
              <CrownLogo className='logo'/>
          </LogoContainer>
          
          <NavLinks>
            <NavLink to='/shop'>SHOP</NavLink>
            {currentUser?(
                <NavLink as='span' onClick={signOutUser}>
                SIGN OUT
                </NavLink>)
                : (<NavLink to='/auth'>
                    SIGN-IN
                </NavLink>)}
            <CartIcon/>
          </NavLinks> 
          {isCartOpen && <CartDropdown/>}
        </NavigationContainer>
        <Outlet/>
      </Fragment>
    )
  }

export default Navigation  