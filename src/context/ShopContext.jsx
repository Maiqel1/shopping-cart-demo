import React, { createContext, useState } from 'react';
import { PRODUCTS } from '../products';

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  PRODUCTS.forEach(product => {
    cart[product.id] = 0;
  });
  return cart;
}

export const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(getDefaultCart());

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = PRODUCTS.find((product) => product.id === +item);
        totalAmount += cartItems[item] * itemInfo.price;
      }
    }
    return totalAmount;
  }

  const addToCart = (itemID) => {
    setCartItems((prev) => ({ ...prev, [itemID]: prev[itemID] + 1 }));
  }

  const removeFromCart = (itemID) => {
    setCartItems((prev) => ({ ...prev, [itemID]: prev[itemID] - 1 }));
  }

  const updateCartItemCount = (newAmount, itemID) => {
    setCartItems((prev) => ({ ...prev, [itemID]: newAmount }));
  }

  const removeCartItem = (itemID) => {
    setCartItems((prev) => ({ ...prev, [itemID]: 0 }));
  }

  const contextValue = { cartItems, addToCart, removeFromCart, updateCartItemCount, getTotalCartAmount, removeCartItem };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
}
