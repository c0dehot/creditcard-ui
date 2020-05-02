import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import PaymentPage from './PaymentPage.js';

// [PaymentPage] TEST OBJECTIVES
// Pass in mock-data, and check:
// 1. Does it render with the forms with this data
// 2. Does it reject with a valid error when the data is invalid (name, cc number, cvv)
// 3. Finally does it go through if the data is valid


// for the jsdom known issue (not implementing getContext)
window.HTMLCanvasElement.prototype.getContext = () => {}

let container = null;
let apiReturn = {};

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

beforeAll(() => {
    // allow our simulated fetch to return whatever result we set to apiResult.
    jest.spyOn(global, "fetch").mockImplementation(
        function( url ){
            return Promise.resolve({
                ok: true, 
                json: () => Promise.resolve(apiReturn)
            })
        }
    );
})

afterAll(() => {
    global.fetch.mockRestore();
})



it( 'renders mocked fetch result', async () => {
    apiReturn = { status: true, paymentInfo: {name: "Test User", number: "0000-1111-2222-3333", cvv: "999", expiry: "01/04/2026"} };

    await act(async () => {
        render( <PaymentPage /> , container);
    })

    // expect the form to contain our mock data
    const formInputs = container.querySelectorAll('.form-control');
    expect(formInputs[0].id).toContain('name');
    expect(formInputs[0].value).toContain('Test User');
    expect(formInputs[1].id).toContain('number');
    expect(formInputs[1].value).toContain('0000-1111-2222-3333');
    //formInputs[2] is date-picker object
    expect(formInputs[3].id).toContain('cvv');
    expect(formInputs[3].value).toContain('999');

    // date picker renders with a hidden input-box name="date" ... check its value
    expect(container.querySelector("input[name='date']").value).toContain('2026-01-04');
});

it( 'submits form data (empty name)', async () => {
    apiReturn = { status: true, paymentInfo: {name: "", number: "0000-1111-2222-3333", cvv: "999", expiry: "01/04/2026"} };
    await act(async () => {
        render( <PaymentPage /> , container);
    })

    // now click the button
    act( ()=>{
        container
          .querySelector("#saveBtn")
          .dispatchEvent(new MouseEvent("click", { bubbles: true }));
      });

    // expect the save to be rejected with name error message to have come up
    const formInputs = container.querySelectorAll('.form-control');
    expect(formInputs[0].classList).toContain('is-invalid');
    expect(container.querySelector('#nameHelp').textContent).toContain('must be at least 4 characters')
});

it( 'submits form data (invalid number)', async () => {
    apiReturn = { status: true, paymentInfo: {name: "Test Name", number: "0000-1111-2222-3333", cvv: "999", expiry: "01/04/2026"} };
    await act(async () => {
        render( <PaymentPage /> , container);
    })

    // now click the button
    act( ()=>{
        container
          .querySelector("#saveBtn")
          .dispatchEvent(new MouseEvent("click", { bubbles: true }));
      });

    // expect the save to be rejected with number error message to have come up
    const formInputs = container.querySelectorAll('.form-control');
    expect(formInputs[1].classList).toContain('is-invalid');
    expect(container.querySelector('#numberHelp').textContent).toContain('must be a valid 16 digit credit')
});

it( 'submits form data (empty cvv)', async () => {
    apiReturn = { status: true, paymentInfo: {name: "Test Name", number: "4532115812123722", cvv: "1", expiry: "01/04/2026"} };
    await act(async () => {
        render( <PaymentPage /> , container);
    })

    // now click the button
    act( ()=>{
        container
          .querySelector("#saveBtn")
          .dispatchEvent(new MouseEvent("click", { bubbles: true }));
      });

    // expect the save to be rejected with cvv error message to have come up
    const formInputs = container.querySelectorAll('.form-control');
    expect(formInputs[3].classList).toContain('is-invalid');
    expect(container.querySelector('#cvvHelp').textContent).toContain('CVV is 3-digits')
});

it( 'submits form data should pass', async () => {
    apiReturn = { status: true, paymentInfo: {name: "Test Name", number: "4532115812123722", cvv: "133", expiry: "01/04/2026"} };
    await act(async () => {
        render( <PaymentPage /> , container);
    })

    // now click the button
    act( ()=>{
        container
          .querySelector("#saveBtn")
          .dispatchEvent(new MouseEvent("click", { bubbles: true }));
      });

    // expect the save to be rejected with number error message to have come up
    const formInputs = container.querySelectorAll('.form-control');
    expect(formInputs[0].classList).toContain('is-valid');
    expect(formInputs[1].classList).toContain('is-valid');
    expect(formInputs[3].classList).toContain('is-valid');
});

