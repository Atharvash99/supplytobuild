import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeFromCart } from "../Redux/action/cartAction";
import StripeCheckout from "react-stripe-checkout";
export default function CartScreen() {
  const dispatch = useDispatch()
  const { cartItems } = useSelector(state => state.cartReducer)
  const HandleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id))
  }
  const getCartAmount = () => {
    return cartItems.reduce((price,item)=>item.price*item.qty+price,0)
  }
  console.log(cartItems)
  return (
    <>
      <center><h2>Cart</h2></center>
    <div className="cart-container">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Product Name</th>
            <th scope="col">Quantity</th>
            <th scope="col">Price</th>
            <th scope="col"></th>
          </tr>
        </thead>
      {
        cartItems.map((item,index) => (
          <tbody>
          <tr key={index}>
              <th scope="row">{ index+1}</th>
            <td><Link to={`/product/${item.product}`}>{item.name}</Link></td>
            <td>{item.qty}</td>
            <td>₹{item.price}</td>
            <td><button className="btn btn-danger shadow" onClick={()=>HandleRemoveFromCart(item.product)}>🗑️</button></td>
          </tr>
        </tbody>  
        ))
      }
      </table>
        <div className="shadow" style={{'padding':'1rem 2rem'}}>
        <h2>Total Price:₹ {getCartAmount().toFixed(2)} </h2>
        <center><StripeCheckout stripeKey={'pk_test_51Ix8pXSIxKHPsONRdSlQDkjZBahOxnkRhKrC2sfuQ3V9ZfutYXXgmyy8O4ofII3SF9euudS9MIWUCk3ccRjerFW000KOpgToSt'}
                amount={getCartAmount * 100 }
                token="" name="Payment"
                billingAddress={true}
              >
                <button className="btn btn-primary">Checkout</button>
              </StripeCheckout></center>
      </div>
      </div>
      </>
  );
}
