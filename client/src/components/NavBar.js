import React from 'react';
import { Link, useLocation } from "react-router-dom";

function NavBar() {
    const location = useLocation();

  return ( 
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <Link to="/" className="navbar-brand">
        <i class="fas fa-shopping-cart"></i>
      </Link>

      <div id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to="/shoppingcart" className={location.pathname === "/productlist" ? "nav-link active" : "nav-link"}>
              Shopping Cart
            </Link>
          </li>          
          <li className="nav-item">
            <Link to="/payment" className={location.pathname === "/productadd" ? "nav-link active" : "nav-link"}>
              Payment Details
            </Link>
          </li> 
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;