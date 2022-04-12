import React, { useEffect,useState} from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import LoadingComponent from "../Component/LoadingComponent";
import { addtocart } from "../Redux/action/cartAction";
import { productAction } from '../Redux/action/productAction'
export default function HomeScreen(props) {
  const dispatch = useDispatch()
  const { loading,products,error } = useSelector(state => state.productReducer)
  useEffect(() => {
    dispatch(productAction())
  }, [dispatch])
  const HandleAddToCart = (id) => {
    dispatch(addtocart(id, 1))
    props.history.push('/cart')
  }
  const [search, setsearch] = useState("")
  return (
    <>
      <center><input type="text" placeholder="Search Product's" style={{ "padding": "0.5rem 1rem" }} value={search}
      onChange={e=>setsearch(e.target.value)}
      /></center>
      <div className="container">
        {
          loading ? (<LoadingComponent/>): error?(<h2>{ error}</h2>):(
            products?.filter(product => {
              if (search == "")
                return product
              else if (product.name.toLowerCase().includes(search.toLowerCase()))
                return product
            })?.map(product => (
            <div className="card" style={{ width: "18rem", marginTop: "2rem" }} key={product._id}>
              <Link to={`/product/${product._id}`}><img
                src={product.images[0]}
                className="card-img-top"
                  alt="..."
                  width="400" height="400"
              /></Link>
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.brand}</p>
                <p className="card-text"><span>&#8377;&nbsp;</span><b>{product.price}</b></p>
                <button className="btn btn-warning w-100" onClick={()=>HandleAddToCart(product._id)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-cart2"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
                  </svg>
                  Add to Cart
                </button>
              </div>
            </div>
          )))
        }
      </div>
    </>
  );
}
