'use strict';

const gulp = require('gulp');
const ts = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const gulp_tcm = require('gulp-typed-css-modules');
const Webpack = require('webpack');
const webpack = require('webpack-stream');
const copy = require('gulp-copy');
const rimraf = require('gulp-rimraf');
const eslint = require('gulp-eslint');
const WebpackDevServer = require('webpack-dev-server');

const tsProject = ts.createProject('tsconfig.json');

gulp.task('clean', () => {
  return gulp.src(['./lib','./dist','./temp'],{ allowEmpty: true })
    .pipe(rimraf());
});

gulp.task('sass',() => {
  return gulp.src('src/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(gulp_tcm())
    .pipe(gulp.dest('./src'))
    .pipe(gulp.dest('./lib'));
});

gulp.task('eslint',() => {
  return gulp.src('src/**/*.ts')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task('tsc',() => {
  return gulp.src('src/**/*.ts')
    //.pipe(sourcemaps.init())
    .pipe(tsProject())
    //.pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./lib'));
});
gulp.task('copy-static-assets',() => {
  return gulp.src(['src/**/*.vue','src/**/*.html','src/**/*.scss'])
    .pipe(copy('./lib',{prefix: 1}));
});

gulp.task('webpack',() => {
  return gulp.src('lib/index.js')
    .pipe(webpack(require('./webpack.config'),Webpack))
    .pipe(gulp.dest('dist'));
});

gulp.task('build', gulp.series('clean','eslint','sass','tsc','copy-static-assets','webpack'));

gulp.task('serve', () => {
  const compiler = webpack(require('./serve.config'));
  new WebpackDevServer(compiler, {
		// server and middleware options
	}).listen(8080, "localhost", function(err) {
		if(err) throw new Error(err);
		// Server listening
		// keep the server alive or continue?
		// callback();
	});
});
