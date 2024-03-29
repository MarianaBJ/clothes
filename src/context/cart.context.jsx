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


const removeCartitem = (cartItems, cartItemToRemove) => {

    //find the cart item to remove
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === cartItemToRemove.id
    );

    //check if quantity is equal to 1, if it's remove that item from the cart
    if (existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
    };

    //return back cartItems with matching cart item with reduced quantity
    return cartItems.map(cartItem =>
        cartItem.id === cartItemToRemove.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem)
}


const clearCartitem = (cartItems, cartItemToClear) => {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id);
}


export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => { },
    cartItems: [],
    addItemToCart: () => { },
    removeItemFromCart: () => { },
    clearItemFromCart: () => { },
    cartCout: 0,
    cartTotal: 0
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCout, setCartCout] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
        setCartCout(newCartCount)
    }, [cartItems])


    useEffect(() => {
        const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0)
        setCartTotal(newCartTotal)
    }, [cartItems])

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd))
    }

    const removeItemFromCart = (cartItemToRemove) => {
        setCartItems(removeCartitem(cartItems, cartItemToRemove))
    }

    const clearItemFromCart = (cartItemToClear) => {
        setCartItems(clearCartitem(cartItems, cartItemToClear))
    }

    const value = {
        isCartOpen,
        setIsCartOpen,
        addItemToCart,
        cartItems,
        cartCout,
        removeItemFromCart,
        clearItemFromCart,
        cartTotal
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};


