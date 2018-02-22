const path = require('path');
module.exports = {
    entry: {
        App: "./src/scripts/App.js"
    },
    output: {
        path: path.resolve(__dirname, "./docs/assets/scripts"),
        filename: "[name].js"
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                query: {
                    presets: ['env']
                },
                test: /\.js$/,
                exclude: /node_modules/
            }
        ]
    }
};