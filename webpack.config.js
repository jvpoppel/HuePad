const path = require('path');

module.exports = {
    devtool: "source-map",
    entry: {
        main: './build-tsc/main.js'
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        modules: [
            "node_modules"
        ]
    },
    mode: "development"
};
