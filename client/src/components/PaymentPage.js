import React, { useState, useEffect } from "react";
import DatePicker from 'react-date-picker';

let priorPaymentInfoExists = false;

function CreditCardPage(){
    const [ form, setForm ]= useState( { name: '', number: '', expiry: '', cvv: '' } )
    const [ inputClass, setInputClass ] = useState( { name: '', number: '', expiry: '', cvv: '' } )

    // on component load (ex. componentDidMount)
    useEffect( function(){
        loadPaymentDetails();
    }, [] );

    async function loadPaymentDetails(){
        const apiResult = await fetch( '/api/payment' ).then( result=>result.json() );

        if( !apiResult.status ){
            alert( 'Sorry something went wrong' );
            return;
        }

        if( !apiResult.paymentInfo.name )
            return;

        priorPaymentInfoExists = true;
        
        // convert date from string to date-object
        apiResult.paymentInfo.expiry = new Date( apiResult.paymentInfo.expiry );
        setForm( apiResult.paymentInfo );
    }

    function handleInputChange( e, regex='', len=0 ){
        let { id, value } = e.target
        const validReg = new RegExp(`[^${regex}]+`).test(value)
        if( regex && new RegExp(`[^${regex}]+`).test(value) )
            return;
        // truncate to the length 
        if( len )
            value = value.substr(0,len);
            
        setForm( { ...form, [id]: value } )
    }

    function updateDate( date ){
        setForm( { ...form, expiry: date } );
    }

    async function saveForm(e){
        e.preventDefault();

        // simple luhn checker (boolean)
        function luhnCheck( num ){
            const chkDigit = num.slice(-1);
            const luhn = num.slice(0,-1).split('').reverse()
                .map( (digit,idx)=>( idx%2 ? digit : digit*2>9 ? digit*2-9 : digit*2 ) )
                .reduce( (t,n)=>t+Number(n) )*9;
            return chkDigit===luhn.toString().slice(-1)
        }
            
        const chkForm = {
            name: form.name.length>4,
            number: form.number.length===16 && luhnCheck( form.number ),
            expiry: form.expiry ? true : false,
            cvv: form.cvv.length===3
        }
        // update input class set
        setInputClass( {
            name: chkForm.name ? 'is-valid' : 'is-invalid',
            number: chkForm.number ? 'is-valid' : 'is-invalid',
            expiry: chkForm.expiry ? 'is-valid' : 'is-invalid',
            cvv: chkForm.cvv ? 'is-valid' : 'is-invalid'
        })

        if( !(chkForm.name && chkForm.number && chkForm.expiry && chkForm.cvv ) )
            return;

        // save & notify the user
        const apiResult = await fetch( '/api/payment',
            {   method: priorPaymentInfoExists ? 'put' : 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            }
            ).then( result=>result.json() );

        if( !apiResult.status ){
            alert( 'Sorry something went wrong' );
            return;
        }
    
        console.log( `[saveForm] VALID, saving data: `, form )
        console.log( `[setFormValid] data: `, chkForm )
    }
    return (
        <div class='container'>
            <h1>Payment Details</h1>
            <form>
                <div class="form-group">
                    <label for="name">Full Name</label>
                    <input onChange={(e)=>handleInputChange(e)} value={form.name} className={`form-control ${inputClass.name}`} id="name" type="text" placeholder="Jane John Doe" />
                    { inputClass.name==='is-invalid' ?
                    <small id="nameHelp" class="text-danger">
                        Your name must be at least 4 characters long.
                    </small> : ''}
                </div>
                <div class="form-group">
                    <label for="number">Credit Card Number</label>
                    <input onChange={(e)=>handleInputChange(e,'0-9',16)} value={form.number} className={`form-control ${inputClass.number}`} id="number" type="text" placeholder="4500 0000 0000 0000" />
                    { inputClass.number==='is-invalid' ?
                    <small id="numberHelp" class="text-danger">
                        This must be a valid 16 digit credit card number
                    </small> : ''}
                </div>
                <div class="form-row">
                    <div class="form-group col-6">
                        <label for="cardExpiry">Expiration</label>
                        <div className={`form-control ${inputClass.expiry}`}>
                            <DatePicker onChange={updateDate} value={form.expiry} id="expiry" minDate={new Date()} format='yyyy-MMM' />
                        </div>
                        { inputClass.expiry==='is-invalid' ?
                        <small id="numberHelp" class="text-danger">
                            Please enter an expiry date!
                        </small> : ''}
                    </div>
                  
                    <div class="form-group col-6">
                        <label for="ccExpiry">CVV</label>
                        <input onChange={(e)=>handleInputChange(e,'0-9',3)} value={form.cvv} className={`form-control ${inputClass.cvv}`} id="cvv" type="text" placeholder="999" />
                        { inputClass.cvv==='is-invalid' ?
                         <small id="numberHelp" class="text-danger">
                            Your number your card's CVV (on the back)
                        </small> : ''}
                    </div>
                                     
                </div>
                <button onClick={saveForm} type="button" class="btn btn-primary">Save CC</button>
            </form>
        </div>
    )
}

export default CreditCardPage;