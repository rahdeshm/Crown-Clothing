import './cart-item.styles.scss'
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
const CartItem=({cartItem})=>{
   

   const {name,imageUrl,price,quantity}=cartItem;
    return(
        <div className='cart-item-container'>
          <img src={imageUrl}  alt={`${name}`}/>
          <div className="item-details">
            <span className='name'>{name}</span>
           
            <span className='price'>{quantity} × {price}</span>
          </div>
        </div>
    )
}

export default CartItem
