const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const lastDirName = path.basename(__dirname);
const dropPath = path.join(__dirname, 'temp', 'stats');
const config = require('./config/config.json');
const ForkTsCheckerPlugin = require('fork-ts-checker-webpack-plugin');
//const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  stats: 'none',
  target: 'node',
  mode: 'development',
  entry: config.bundles,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          'babel-loader'
        ]
      },
      {
        test: /\.css/,
        use: [
          'style-loader',
          'webpack-typings-for-css',
          'css-loader'
        ]
      },
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader'
          }
        ]
      },
      {
        resourceQuery: /vue&type=script&lang=ts/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/],
          transpileOnly: true
        }
      },
      {
        resourceQuery: /vue&type=style.*&lang=scss/,
        use: [
          'style-loader',
          'webpack-typings-for-css',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[local]_[sha1:hash:hex:8]'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: 'postcss.config.js'
              }
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.scss/,
        exclude: /\.module.scss/,
        use: [
          'style-loader',
          'webpack-typings-for-css',
          {
            loader: 'css-loader',
            options: {
              localIdentName: '[local]_[sha1:hash:hex:8]'
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.module.scss/,
        use: [
          'style-loader',
          'webpack-typings-for-css',
          {
            loader: 'css-loader',
            options: {
              localIdentName: '[local]_[sha1:hash:hex:8]',
              modules: true
            }
          },
          'sass-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx', '.vue']
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, '/dist/'),
    inline: true,
    host: 'localhost',
    port: 8080,
  },
  watch: false,
  plugins: [
    new HtmlWebpackPlugin({
      template: './lib/index.html',
    }),
    new VueLoaderPlugin(),
    new BundleAnalyzerPlugin({
      openAnalyzer: false,
      analyzerMode: 'static',
      reportFilename: path.join(dropPath, `${lastDirName}.stats.html`),
      generateStatsFile: true,
      statsFilename: path.join(dropPath, `${lastDirName}.stats.json`),
      logLevel: 'error'
    }),
    new HtmlWebpackExternalsPlugin({
      externals: config.externals
    }),
    new ForkTsCheckerPlugin({
      tsconfig: path.resolve(__dirname,'tsconfig.json'),
      typescript: require.resolve('typescript'),
      formatter: 'codeframe',
      vue: true,
      memoryLimit: 4096,
      //silent: true,
      eslint: true
    })
  ]
};
