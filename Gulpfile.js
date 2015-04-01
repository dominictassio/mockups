/* jshint node:true */
var gulp = require('gulp');
var jade = require('gulp-jade');
var gutil = require('gulp-util');
var connect = require('gulp-connect');
var open = require('gulp-open');

gulp.task('jade', function() {
    var LOCALS = {
        'assets': 'http://localhost:8000/assets/',
        'css': 'css/bootstrap.css',
        'js': [
            'js/vendor/jquery-1.11.2.min.js',
            'js/bootstrap.min.js'
        ],
        "sponsors": [
            ["bvcaps.org", "Blue Valley CAPS"],
            ["bvef.org", "BVEF"],
            ["sprint.com", "Sprint"],
            ["gm.com", "General Motors"],
            ["honeywell.com", "Honeywell"],
            ["cerner.com", "Cerner"],
            ["ryerson.com", "Ryerson"],
            ["nasa.gov", "NASA"]
        ],
        'first': 'img/FIRSTicon_RGB.jpg',
        'recyclerush': 'img/RecycleRush.jpg'
    };

    gulp.src('./jade/*.jade')
        .pipe(jade({
            locals: LOCALS
        }))
        .pipe(gulp.dest('./html'))
        .pipe(connect.reload());
});

gulp.task('server', function() {
    connect.server({
        livereload: true,
        port: 8000
    });
});

gulp.task('watch', ['server'], function() {
    gulp.watch('./jade/**/*.jade', ['jade']);
});

gulp.task('open', function() {
    gulp.src('./index.html')
        .pipe(open('', {url: 'http://localhost:8000/html'}));
});

gulp.task('default', ['jade', 'watch', 'open']);