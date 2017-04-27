const path = require( 'path' );

module.exports = {
    entry: [
        './src/index.js'
    ],
    output: {
        filename: 'app.js',
        path: path.resolve( __dirname, 'build' )
    },
    devtool: 'eval-source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                options: {
                    presets: ['es2015', 'react']
                },
                include: [
                    path.resolve( __dirname, 'src/' )
                ]
            }
        ]
    }
};

var path = require('path');

module.exports = {
    entry: './foo.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'foo.bundle.js'
    }
};