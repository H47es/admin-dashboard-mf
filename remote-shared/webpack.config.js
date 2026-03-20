const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");

module.exports = {
    entry: "./src/index.ts",
    mode: "development",
    devServer: {
        port: 3003,
        open: true,
    },
    output: {
        publicPath: "auto",
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    module: {
        rules: [
            { test: /\.tsx?$/, loader: "ts-loader", exclude: /node_modules/ },
        ],
    },
    plugins: [
        new ModuleFederationPlugin({
            name: "shared",
            filename: "remoteEntry.js",
            exposes: {
                "./store": "./src/store", // <-- expose your store
            },
            shared: {
                rxjs: { singleton: true },
                react: { singleton: true, requiredVersion: "19.2.4" },
            },
        }),
        new HtmlWebpackPlugin({
            template: "./public/index.html",
        }),
    ],
};