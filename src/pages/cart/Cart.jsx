import React, { useContext } from 'react';
import { PRODUCTS } from '../../products';
import { ShopContext } from '../../context/ShopContext';
import CartItem from './CartItem';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Products from '../shop/Products';
import Newsletter from '../../components/Newsletter';
import Footer from '../../components/Footer';

function Cart() {
  let navigate = useNavigate();
  const { cartItems, getTotalCartAmount } = useContext(ShopContext);
  const totalAmount = getTotalCartAmount();

  return (
    <div className='cart row'>
      <div className="col-12 col-lg-8">
        <div className="cartHeader">
          <div className="headerItem">PRODUCT</div>
          <div className="headerItem">PRICE</div>
          <div className="headerItem">QUANTITY</div>
          <div className="headerItem d-none d-md-block">SUBTOTAL</div>
        </div>
        <div className="cartItems">
          {PRODUCTS.map((product) => {
            if (cartItems[product.id] > 0) {
              return <CartItem key={product.id} data={product} />;
            }
          })}
        </div>
        <div className="total"></div>
      </div>
      {totalAmount > 0 ? (
        <div className="col-8 col-sm-8 col-md-6 col-lg-4 ">
          <h4>CART TOTALS</h4>
          <div className='d-flex justify-content-between'>
            <h4>SUBTOTAL</h4>
            <p className=''>N{totalAmount}</p>
          </div>
          <h4>SHIPPING</h4>
          <p>Shipping : <b>N35000</b></p>
          <p>SHIPPING TO KAFACHAN</p>
          <form className='d-flex'>
            <input type="text" className='col-8' placeholder='COUPON CODE' />
            <div className='p-3 ms-2 apply'>APPLY</div>
          </form>
          <h4>TOTAL</h4>
          <Link to="/checkout" className='checkoutBtnL'>
            <button className="checkoutBtn col-12 btn-lg btn-block">
              Proceed to Checkout
            </button>
          </Link>
        </div>) : (
        <h2>Your cart is empty</h2>
      )}
      <Products text={['Suggestions']} />
      <Newsletter />
      <Footer />
    </div>
  );
}

export default Cart;
