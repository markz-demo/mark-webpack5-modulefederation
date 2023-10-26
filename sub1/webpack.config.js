const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
    entry: {
        index: './src/index.js',
    },
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: '[name].[contenthash:8].js',
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
        new ModuleFederationPlugin({
            name: 'sub1_app', // 子应用名字，对应主应用中@前面的名字
            filename: 'sub1.js', // 编译生成的文件名，对应主应用中@后面的文件名
            exposes: {
                './tab': './src/tab.jsx', // <被引用时的subpath>: <对应tab.jsx文件路径>
                './nav': './src/nav.jsx',
                './replace': './src/replace.jsx',
            },
            shared: {
                'react': { singleton: true },
                'react-dom': { singleton: true },
                'react-router-dom': { singleton: true },
                'antd': { singleton: true }
            },
        })
    ],
};
