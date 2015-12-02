'use strict';
console.time("Loading plugins"); //start measuring
var gulp = require('gulp'),
//uglify = require('gulp-uglify'),
//concat = require('gulp-concat'),
//ngmin  = require('gulp-ngmin'),
//filter = require('gulp-filter'),
//less   = require('gulp-less'),
//imagemin = require('gulp-imagemin'),
//templateCache = require('gulp-angular-templatecache'),

    $ = require('gulp-load-plugins')();


console.timeEnd("Loading plugins"); //end measuring

var DEST = 'build';




gulp.task('styles', function () {
    gulp.src([        
        './src/styles/styles.less'])
        .pipe($.less())

        .on('error', swallowError)
        .pipe($.concat('styles.min.css'))
        .pipe($.autoprefixer({
            browsers: ['last 50 versions'],
            cascade: false
        }))
        //.pipe($.minifyCss())
        .pipe(gulp.dest(DEST + '/css'));

});





gulp.task('fonts', function () {
    gulp.src([
        './src/fonts/**/*.eot',
        './src/fonts/**/*.ttf',
        './src/fonts/**/*.woff'
    ])

        .pipe(gulp.dest(DEST + '/fonts'));
});


gulp.task('html', function () {
    gulp.src([
        './src/*.html',      
        './src/*.php',      
    ])

        .pipe(gulp.dest(DEST + '/'));
});

gulp.task('javascripts', function () {
    return gulp.src('src/js/**/*.js')
        .pipe($.concat('build.js'))
        //.pipe(uglify({mangle: true}))
        .pipe(gulp.dest(DEST + '/js'));
});

gulp.task('imgmin1', function () {
    try {
        gulp.src([
            './src/images/**/*.png',
            './src/images/**/*.jpg',
            './src/images/**/*.gif',
        ])
            .pipe($.imagemin({
                optimizationLevel: 8,
                progressive: true,
                interlaced: true
            }))

            .pipe(gulp.dest(DEST + '/images'))
    } catch (err) {
        console.error('Error catched: ' + err);
    }
});

gulp.task('imgmin2', function () {
    gulp.src('./src/images/**/*.svg')

      .pipe(gulp.dest(DEST + '/images'));
});

gulp.task('watch', function () {
    gulp.watch('src/**', ['javascripts', 'templates']);
    gulp.watch('./src/**/*.less', ['styles']);
    gulp.watch('./src/images/*', ['imgmin']);

});

gulp.task('build-full', ['styles', 'imgmin', 'javascripts']);
gulp.task('build', ['styles', 'javascripts']);
gulp.task('default', ['watch', 'build']);
gulp.task('imgmin', ['imgmin1', 'imgmin2']);


function swallowError(error) {
    console.log(error.toString());
    this.emit('end');
}

