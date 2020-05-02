import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { render, unmountComponentAtNode } from "react-dom";
import NavBar from './NavBar.js';

// Test objectives
// 1. Does it render to default menu bolded
// 2. If the path is changed, does it render to that Payment page accordingly?

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it( 'renders nav bar (default)', () => {
    render( <Router><NavBar /></Router> , container);

    // expect the first entry to be active and have text 'Shopping Cart'
    const navItem = container.querySelectorAll('li')[0];
    expect(navItem.textContent).toContain('Shopping Cart');
    expect(navItem.innerHTML).toContain('nav-link active');
});

it( 'renders nav bar (payments)', () => {
    render( <Router><NavBar pathname='/payment' /></Router> , container);

    // expect the second entry to be 'Payment Details' && to have active class
    const navItem = container.querySelectorAll('li')[1];
    expect(navItem.textContent).toContain('Payment Details');
    expect(navItem.innerHTML).toContain('nav-link active');
});


