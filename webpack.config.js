const path = require( 'path' );

// Configuración común para desarrollo y producción
var config = {
    entry: [
        './src/index.js'
    ],
    output: {
        filename: 'app.js',
        path: path.resolve( __dirname, 'build' )
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                options: {
                    presets: [ 'es2015', 'react' ]
                },
                include: [
                    path.resolve( __dirname, 'src/' )
                ]
            }
        ]
    }
};

// module.exports ahora es una función que recibe la variable env
module.exports = function( env ) {
    var production = 'prod' === env;
    if ( production ) {
        config.devtool = 'source-map';
    }
    else {
        config.devtool = 'cheap-module-eval-source-map';
    }

    // ¡No olvidar retornar el objecto config!
    return config;
};