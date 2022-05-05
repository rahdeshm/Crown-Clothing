import { useContext } from 'react';
import { useSelector } from 'react-redux';
import {CartDropdownContainer,EmptyMessage,CartItems} from './cart-dropdown.styles'
import Button  from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { CartContext } from '../../contexts/cart.context';
import { useNavigate } from 'react-router-dom';
import { selectCartItems } from '../../store/cart/cart.selector';

const CartDropdown=()=>{
    
// const {cartItems}=useContext(CartContext);
const cartItems=useSelector(selectCartItems);
const navigate=useNavigate();
const goToCheckoutHander=()=>{
  navigate('/checkout')
}
console.log(cartItems)
    return(
        <CartDropdownContainer>
        <CartItems>
         {
           cartItems.length?((cartItems.map((item)=><CartItem key={item.id} cartItem={item}/>
           ))):(<EmptyMessage> Your cart is empty</EmptyMessage>) 
         }
        </CartItems>
        <Button onClick={goToCheckoutHander} >Go to checkout</Button>
        </CartDropdownContainer>
    )
}

export default CartDropdown