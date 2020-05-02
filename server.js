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

    console.log( `[POST /api/payment]`, paymentInfo );
    // 201 = created
    res.status(201).send({ status: true, paymentInfo });
 });
 
 app.put('/api/payment', function( req,res ){
    const tmpData = req.body;
    // our quick and dirty input validation
    paymentInfo = { 
        name: tmpData.name,
        number: tmpData.number,
        expiry: tmpData.expiry,
        cvv: tmpData.cvv };

    console.log( `[PUT /api/payment]`, paymentInfo );
    // 202 = accepted
    res.status(202).send({ status: true, paymentInfo });
 });

 app.delete('/api/payment', function( req,res ){
    paymentInfo = {}

    console.log( `[DELETE /api/payment]` )
    res.status(202).send({ status: true, paymentInfo });
 });

 app.get('/api/*', function( req,res ){
     res.status(400).send({ status: false})
 })

 // to allow the react router paths, we must pass all
// wildcard unknown URLs to react 
app.get('/*', function (req, res) {
    console.log( `[/*] (${req.protocol}//${req.get('host')}/${req.originalUrl} -- sending file: ${__dirname}/client/build/index.html` );
    res.status(200).sendFile(`${__dirname}/client/build/index.html`);
 });
 

app.listen( PORT, function(){
    console.log( `[creditcard server] RUNNING, http://localhost:${PORT}` );
 });