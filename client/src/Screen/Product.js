import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { addtocart } from "../Redux/action/cartAction";
import { singleProductAction } from "../Redux/action/productAction";
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'
import LoadingComponent from "../Component/LoadingComponent";
export default function Product(props) {
  const id = props.match.params.id
  const dispatch = useDispatch()
  const { loading, product, error } = useSelector(state => state.singleProductReducer)
  useEffect(() => {
    dispatch(singleProductAction(id))
  }, [dispatch, id])
  const [qty, setQty] = useState(1)
  const HandleAddTocart = (id) => {
    dispatch(addtocart(id, qty))
    props.history.push('/cart')
  }
  const MakePayment = (token) => {
    const userToken = localStorage.getItem('token')
    if (!userToken)
      window.location.href='/login'
    const productDetail = { name: product.name, price: product.price * qty, qty: qty }
    axios.post('/payment', {token, productDetail,userToken})
      .then(res => { console.log(res) })
      .catch(err => { console.log(err) })
  }
  return (
    <>{
      loading ? (<LoadingComponent/>) : error ? (<h2>{error}</h2>) : (
        <div className="product-container">
          <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img src={product.images[0]} class="d-block w-100" alt="..." />
              </div>
              <div class="carousel-item">
                <img src={product.images[1]} class="d-block w-100" alt="..." />
              </div>
              <div class="carousel-item">
                <img src={product.images[2]} class="d-block w-100" alt="..." />
              </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
          <div className="detail">
            <h3>{product.name}</h3>
            <p>{product.brand}</p>
            <h5>₹{product.price}</h5>
          </div>
          <div className="Checkout shadow">
            QTY
            <select value={qty} onChange={(e) => setQty(e.target.value)}>
              {
                [...Array(product.inStock).keys()].map((x) => (
                  <option key={x + 1} value={x + 1}>{x + 1}</option>
                ))
              }
            </select>
            <div>
              <button className="btn btn-warning" style={{ "marginRight": "1rem" }} onClick={() => HandleAddTocart(product._id)}>Add to Cart</button>
              <StripeCheckout stripeKey={'pk_test_51KYucOSCY09m4IvDkA07Ughdz8ygQkcCaFeULA4WWgNqxKlnIoe0dYzGkXjv07QW7VIkEkCfR8ZODoKC4Q6SDJRX00wfv60At7'}
                amount={product.price * 100 * qty}
                token={MakePayment} name={`${product.name} Payment`}
                billingAddress={true}
              >
                <button className="btn btn-primary">Checkout</button>
              </StripeCheckout>
            </div>
          </div>
        </div>)}
    </>
  );
}
