import {ShoppingIcon,CartIconContainer,ItemCount} from './cart-icon.styles';
// import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg'
import { useEffect,useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import { useDispatch,useSelector } from 'react-redux';
import { selectCartCount,selectIsCartOpen } from '../../store/cart/cart.selector';
import {setIsCartOpen} from '../../store/cart/cart.action'
const CartIcon = () => {
    
    // const {isCartOpen,setIsCartOpen,cartCount}=useContext(CartContext);
    const dispatch=useDispatch();
    const cartCount=useSelector(selectCartCount);
    const isCartOpen=useSelector(selectIsCartOpen);
    const toggleIsCartOpen=()=>dispatch(setIsCartOpen(!isCartOpen));

    return(
        <CartIconContainer onClick={toggleIsCartOpen}>
          <ShoppingIcon className='shopping-icon'/>
          <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer> 
    )

}

export default CartIcon