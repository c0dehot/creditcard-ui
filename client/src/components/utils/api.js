async function get( url ){
    try{ 
        return await fetch( url )
            .then( (result) =>{ 
                if( !result.ok ) 
                    throw new Error(`${result.status}:${result.statusText}`);

                return result.json()
            });
    } catch( e ){
        // catch our server error and other possible ajax errors (timeout, etc)
        // console.log( `[error] Error with our fetch`, e.message );
        alert( `Sorry we had a problem with the API: ${e.message}` );
        return false;
    }
}

async function post( url, form ){
    try{ 
        return await fetch( '/api/payment',
            {   method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            }
        ).then( result=>result.json() );
    } catch( e ){
        // catch our server error and other possible ajax errors (timeout, etc)
        // console.log( `[error] Error with our fetch`, e.message );
        alert( `Sorry we had a problem with the API: ${e.message}` );
        return false;
    }        
}

async function put( url, form ){
    try{ 
        return await fetch( '/api/payment',
            {   method: 'put',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            }
        ).then( result=>result.json() );
    } catch( e ){
        // catch our server error and other possible ajax errors (timeout, etc)
        // console.log( `[error] Error with our fetch`, e.message );
        alert( `Sorry we had a problem with the API: ${e.message}` );
        return false;
    }        
}

export default { get, post, put }