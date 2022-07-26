const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
   
    mode: "development",
    entry: "./src/index.js",
    resolve : { // 확장자 찾아서 붙어줌
        extensions : ['.js', '.jsx']
    },
    module: {
        rules : [{
            test: /\.jsx?/, // 대상 설정 정규식
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env', '@babel/preset-react'],
                plugins: ['@babel/plugin-proposal-class-properties'],
            },
        },
        {
            test: /\.css$/i,
            use: [MiniCssExtractPlugin.loader, 'css-loader'],
        }
    
    ]},
    plugins: [new MiniCssExtractPlugin()],
    optimization: {
        minimizer: [
          new CssMinimizerPlugin(),
        ],
        // runtimeChunk: 'single', 오류 발생함
    },
    output:{// 최종적으로 만들어질 js
        path: path.join(__dirname, '/docs'), //빌드 위치
        filename : '[fullhash].bundle.js',  //웹팩 빌드 후 최종적으로 만들어질 파일
        clean: true,
    },
    devServer: {
        static: './docs',
    },
}