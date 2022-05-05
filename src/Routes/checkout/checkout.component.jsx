import './checkout.styles.scss';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import CheckoutItem from '../../Components/checkout-item/checkout-item.component';
import { selectCartCount,selectCartTotal,selectCartItems } from '../../store/cart/cart.selector';
import {useSelector} from 'react-redux';

const Checkout=()=>{
    // const {cartItems,cartTotal}=useContext(CartContext)
    const cartItems=useSelector(selectCartItems);
    const cartTotal=useSelector(selectCartTotal);
    return (
        <div className='checkout-container'>
         <div className='checkout-header'>
            <div className="header-block">
              <span>Product</span>
            </div>
            <div className="header-block">
            <span>Description</span>
            </div>
            <div className="header-block">
            <span>Quantity</span>
            </div>
            <div className="header-block">
            <span>Price</span>
            </div>
            <div className="header-block">
            <span>Remove</span>
            </div>
         </div>
         {cartItems.map((cartItem)=>{
                 const {id,name,quantity}=cartItem;
                 return(
                     <CheckoutItem key={id} cartItem={cartItem}/>
                 )
             })
        }
        <span className='total'>Total: ${cartTotal}</span>
        </div>
    )
}
export default Checkout