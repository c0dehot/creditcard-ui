const express = require( 'express' );
const PORT = process.env.PORT || 8080;

const app = express();

app.use( express.static('client/build/') );
app.use( express.urlencoded({ extended: false }) );
app.use( express.json() );

let paymentInfo = {};

// endpoints
app.get('/api/payment', function( req,res ){
    // parse the :id and serve ONE product.
    console.log( `[GET /api/payment]` )
    res.send({ status: true, paymentInfo });
 });
 
 app.post('/api/payment', function( req,res ){
    const tmpData = req.body;
    // our quick and dirty input validation
    paymentInfo = { 
        name: tmpData.name,
        number: tmpData.number,
        expiry: tmpData.expiry,
        cvv: tmpData.cvv };

    console.log( `[POST /api/payment]`, paymentInfo )
    res.send({ status: true, paymentInfo });
 });
 
 app.put('/api/payment', function( req,res ){
    const tmpData = req.body;
    // our quick and dirty input validation
    paymentInfo = { 
        name: tmpData.name,
        number: tmpData.number,
        expiry: tmpData.expiry,
        cvv: tmpData.cvv };

    console.log( `[PUT /api/payment]`, paymentInfo )
    res.send({ status: true, paymentInfo });
 });

 app.delete('/api/payment', function( req,res ){
    paymentInfo = {}

    console.log( `[DELETE /api/payment]` )
    res.send({ status: true, paymentInfo });
 });

 // to allow the react router paths, we must pass all
// wildcard unknown URLs to react 
app.get('/*', function (req, res) {
    console.log( `[/*] (${req.protocol}//${req.get('host')}/${req.originalUrl} -- sending file: ${__dirname}/client/build/index.html` );
    res.sendFile(`${__dirname}/client/build/index.html`);
 });
 

app.listen( PORT, function(){
    console.log( `[creditcard server] RUNNING, http://localhost:${PORT}` );
 });