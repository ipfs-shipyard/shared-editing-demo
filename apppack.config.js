const path = require('path');
const webpack = require('webpack');


module.exports = {
    entry: './src/app.js',
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, './public/js/')
    },
    plugins:[
        new webpack.ContextReplacementPlugin(
            /y.*/
        )
    ]
};


