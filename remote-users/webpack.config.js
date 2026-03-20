const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");

module.exports = {
    mode: "development",
    entry: "./src/index.ts",
    devServer: { port: 3001 },
    resolve: { extensions: [".tsx", ".ts", ".js"] },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                options: { configFile: path.resolve(__dirname, "tsconfig.json") },
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new ModuleFederationPlugin({
            name: "users",
            filename: "remoteEntry.js",
            remotes: {
                shared: "shared@http://localhost:3003/remoteEntry.js",
            },
            exposes: { "./users": "./src/users" },
            shared: {
                react: { singleton: true, requiredVersion: "^19.2.4" },
                "react-dom": { singleton: true, requiredVersion: "^19.2.4" },
                rxjs: { singleton: true, requiredVersion: "^7.8.2" }
            }
        }),
        new HtmlWebpackPlugin({ template: "./public/index.html" })
    ]
};