const path = require('path');

const webpack = require("webpack");
const isDev = process.env.NODE_ENV === "development";

/*plugins*/
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

/*plugins config*/
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: path.resolve(__dirname, `templates/index.html`),
    filename: "index.html",
    inject: "body"
});

const CleanWebpackPluginConfig = new CleanWebpackPlugin({
    verbose: true
});

const minimazeConfig = [
    new webpack.LoaderOptionsPlugin({
        minimize: true
    })
];

const baseConfig = {
    entry: ['./src/Core/index.js',"./src/templates/index.css"],
    output: {
        filename: 'index_bundle.js',
        path: path.resolve("./build"),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                options: {
                    babelrc: false,
                    presets: ['@babel/preset-env'],
                    plugins: [
                        '@babel/plugin-proposal-class-properties',
                        "@babel/plugin-proposal-optional-chaining",
                        "@babel/plugin-transform-runtime",
                        ["@babel/plugin-proposal-decorators",{ decoratorsBeforeExport: false }]
                    ]
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/i,
                loader: 'file-loader',
                options:{
                    name:"index.css"
                }
            }
        ]
    },
    plugins: [HtmlWebpackPluginConfig, CleanWebpackPluginConfig],
    performance: {
        hints: false
    },
   resolve:{
       alias: {
           core: path.resolve(__dirname, "core/"),
           modules: path.resolve(__dirname, "core/modules/"),
           services: path.resolve(__dirname, "core/services/"),
           utils: path.resolve(__dirname, "core/utils/"),
       }
   }
};

const productionConfig = {
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    compress: {
                        drop_console: true
                    }
                },
                sourceMap: false
            })
        ]
    }
};

const devConfig = {
    devServer: {
        contentBase:path.resolve("./dist"),
        port: 9000,
        overlay: true
    },
    devtool: "eval-sourcemap"
}

let targetConfig;

if (isDev) {
    targetConfig = { ...baseConfig, ...devConfig };
} else {
    targetConfig = { ...baseConfig, ...productionConfig };
    targetConfig.plugins = [...targetConfig.plugins, ...minimazeConfig];
}


module.exports = targetConfig;
