// alege ce set de credentials sa foloseasca. DEV vs PROD

// in Heroku, variabila de mai jos va primi automat valoarea de 'production'.
if (process.env.NODE_ENV === 'production') {
    // return la keys pentru PROD
    module.exports = require('./prod');
} else {
    // return la keys pentru DEV
    module.exports = require('./dev');
}

