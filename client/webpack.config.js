const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');



// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'Contact Cards'
      }),

      // Injects our custom service worker
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',


        // swSrc: path.join(process.cwd(), '/app/resources/service-worker.js'),
        // swDest: 'sw.js',
        // exclude: [
        //   /\.map$/,
        //   /manifest$/,
        //   /\.htaccess$/,
        //   /src-sw\.js$/,
        //   /service-worker\.js$/,
        //   /sw\.js$/,
        // ],


      }),

      // Creates a manifest.json file.
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: 'Just Another text Editor',
        short_name: 'JATE',
        description: 'Web based text editor',
        background_color: '#01ffe1',
        theme_color: '#01ffe1',
        start_url: './',
        publicPath: './',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
    ],

    module: {
      //target: "es5", //To make bundle ecma5 compliant

      // CSS loaders
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          //https://stackoverflow.com/questions/34404496/webpack-not-converting-es6-to-es5/59328252#59328252
          // exclude: /node_modules/,
          exclude: /(node_modules|bower_components)/,
          // We use babel-loader in order to use ES6.
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: [
                '@babel/plugin-proposal-object-rest-spread', 
                '@babel/transform-runtime'
                //["@babel/plugin-transform-arrow-functions", { "spec": true }]
              ],
            },
          },
        },
      ],
    },
  };
};
