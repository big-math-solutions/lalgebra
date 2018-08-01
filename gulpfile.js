'use strict';

let gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    mocha = require('gulp-mocha');
    // Lint
gulp.task('lint', () => gulp.src([ '**/*.js', '!./node_modules/**' ])
    .pipe(jshint())
    .pipe(jshint.reporter(stylish)));
// Default
gulp.task('default', [ 'lint', 'test' ], () => {
    gulp.watch([ '**/*.js', '!./node_modules/**' ], [ 'test' ]);
});
// Test
gulp.task('test', () => gulp.src('./test/test.js', {
    read: false
}).pipe(mocha({
    reporter: 'nyan'
})));
