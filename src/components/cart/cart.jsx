import './cart.css';
import Button from '../button/button';
import { totalPrice } from '../../units/total-price';

const Cart = ({cartItems, onCheckout}) => {


  return (
    <div className='cart_container'>
        <p>Umumiy narx: {totalPrice(cartItems).toLocaleString('en-US',
            {style:'currency',
            currency:'USD',})} </p>

        <Button title={`${cartItems.length === 0 ? "Buyurtma berish" : "To'lov"}`}
         disable={cartItems.length === 0}
        type={'checkout'}
        onClick={onCheckout}/>
    </div>
  )
}

export default Cart