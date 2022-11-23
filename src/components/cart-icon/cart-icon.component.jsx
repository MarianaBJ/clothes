import './cart-icon.styles.scss';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import { CartContext } from '../../context/cart.context';
import { useContext } from 'react';

const CartIcon = () => {

    const { isCartOpen, setIsCartOpen, cartCout } = useContext(CartContext);

    const toggleIsOpen = () => setIsCartOpen(!isCartOpen);

    return (
        <div className='cart-icon-container' onClick={toggleIsOpen}>
            <ShoppingIcon className='shopping-icon' />
            <span className='item-count'>{cartCout}</span>
        </div>
    )
}

export default CartIcon;