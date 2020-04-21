import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
// import { GlobalStore } from "./components/GlobalStore";
import NavBar from './components/NavBar';
import PaymentPage from './components/PaymentPage';
import ShoppingCartPage from './components/ShoppingCartPage';

function App() {
  return (
      <Router>
      <div className="App">
          <NavBar />
          <div class="container">
            <Route exact path={["/","/shoppingcart"]} component={ShoppingCartPage} />
            <Route exact path="/payment" component={PaymentPage} />
            </div>
      </div>
      </Router>
  );
}

export default App;
