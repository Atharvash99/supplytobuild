import { BrowserRouter, Link, Route } from 'react-router-dom'
import './App.css';
import Footer from './Component/Footer'
import HomeScreen from './Screen/HomeScreen';
import CartScreen from './Screen/CartScreen';
import Dashboard from './Screen/Dashboard';
import Product from './Screen/Product';
import LoginScreen from './Screen/LoginScreen';
import RegisterScreen from './Screen/RegisterScreen';
import AuthScreen from './Screen/AuthScreen';
import UploadScreen from './Screen/UploadScreen'
import ProfileComponent from './Component/ProfileComponent';
function App() {
  const token = localStorage.getItem('token')
  const HandleLogout = () => {
    localStorage.removeItem('token')
    window.location.href="/"
  }
  return (
    <BrowserRouter>
      <nav className="navbar navbar-dark bg-dark fixed-top">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Supply2Build</Link>
          <form className="d-flex">
            {
              token ? (
                <div class="btn-group" style={{"marginRight":"0.5rem"}}>
                  <Link class="btn btn-info" to="/dashboard">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                  </svg>
                  </Link>
                  <button type="button" class="btn btn-info dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                    <span class="visually-hidden">Toggle Dropdown</span>
                  </button>
                  <ul class="dropdown-menu">
                    <li><Link class="dropdown-item" to="/dashboard">Dashboard</Link></li>
                    <li><Link class="dropdown-item" to="/profile">Profile Setting</Link></li>
                    <li><hr class="dropdown-divider"/></li>
                    <li><button class="dropdown-item" onClick={HandleLogout}>Log out</button></li>
                  </ul>
                </div>
                
                /*<Link className="nav-link " href="#" style={{ "color": "white" }} to="/dashboard">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                  </svg>
              </Link>*/) :
                (<Link className="nav-link" href="#" style={{ "color": "white" }} to="/login">Login</Link>)
            }
            <Link className="nav-link" href="/cart" style={{ "color": "white" }} to="/cart">Cart</Link>
          </form>
        </div>
      </nav>
      <div className="main-container">
        <Route component={HomeScreen} exact path='/' />
        <Route component={CartScreen} path='/cart' />
        <Route component={Product} path="/product/:id" />
        <Route component={LoginScreen} path="/login" />
        <Route component={RegisterScreen} path="/register" />
        <Route component={AuthScreen(Dashboard)} path="/dashboard" />
        <Route component={UploadScreen} path="/upload" />
        <Route component={ProfileComponent} path="/profile"/>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
