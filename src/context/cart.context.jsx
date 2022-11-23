import { useEffect } from 'react';
import { createContext, useState } from 'react';


const addCartItem = (cartItems, productToAdd) => {
    //find if cartItems contains productToAdd

    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
    );


    //If found, increment quantity

    if (existingCartItem) {
        return cartItems.map(cartItem =>
            cartItem.id === productToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem)
    }


    //return new array with modified cartItems

    return [...cartItems, { ...productToAdd, quantity: 1 }]
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => { },
    cartItems: [],
    addItemToCart: () => { },
    cartCout: 0
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCout, setCartCout] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
        setCartCout(newCartCount)
    }, [cartItems])

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd))
    }

    const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCout };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};


