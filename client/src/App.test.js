import React from 'react';
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import App from './App';

// [App] TEST OBJECTIVES
// Check overall app renders, and default is 'Shopping Cart'


// for the jsdom known issue (not implementing getContext)
window.HTMLCanvasElement.prototype.getContext = () => {}
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

it('default app page is shopping cart', async () => {
  // api calls are async, we have to wait for this
  await act(async () => {
    render( <App /> , container);
  })
  expect(container.querySelector('.container').textContent).toContain('Successful Shopping Cart Page');
});
