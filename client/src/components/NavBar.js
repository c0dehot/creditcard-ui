import React from 'react';
import { Link, useLocation } from "react-router-dom";

function NavBar( props ) {
    let location = useLocation();
    if( props.pathname ) location = { pathname: props.pathname };
    
    return ( 
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to="/" className="navbar-brand">
            <i className="fas fa-shopping-cart"></i>
        </Link>

        <div id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
            <li className="nav-item">
                <Link to="/shoppingcart" className={location.pathname ==='/' || location.pathname === "/shoppingcart" ? "nav-link active" : "nav-link"}>
                Shopping Cart
                </Link>
            </li>          
            <li className="nav-item">
                <Link to="/payment" className={location.pathname === "/payment" ? "nav-link active" : "nav-link"}>
                Payment Details
                </Link>
            </li> 
            </ul>
        </div>
        </nav>
    );
}

export default NavBar;