const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
    entry: {
        index: './src/index.js',
    },
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: '[name].[contenthash:8].js',
        publicPath: '/',
        clean: true,
    },
    mode: 'development',
    devtool: 'source-map',
    target: 'browserslist',
    cache: true,
    module: {
        rules: [{
            test: /\.(less|css)$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
        }, {
            test: /\.jsx$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [
                        "@babel/preset-env",
                        [
                            "@babel/preset-react", { "runtime": "automatic" }
                        ]
                    ]
                }
            }
        }],
    },
    resolve: {
        modules: ["./node_modules"],
        extensions: [".js", ".json", ".jsx", ".css"],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[id].[contenthash:8].css",
        }),
        new HtmlWebpackPlugin(), // html是主应用里渲染的，需要编译生成html
        new ModuleFederationPlugin({
            name: 'main_app', // 主应用名字
            remotes: {
                'sub1': 'sub1_app@http://localhost:3001/sub1.js', // <import时的别名>: <子应用名字@子应用对应文件路径>
            },
            shared: { // 第三方资源共享
                'react': { singleton: true },
                'react-dom': { singleton: true },
                'react-router-dom': { singleton: true },
                'antd': { singleton: true }
            },
        })
    ],
};
