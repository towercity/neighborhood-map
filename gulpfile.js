var gulp = require('gulp');

var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');
var minifyHTML = require('gulp-minify-html');
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');
var autoprefix = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');

// minify new images in main website folder
gulp.task('imagemin', function() {
    var imgSrc = './src/img/**/*',
        imgDst = './build/img';

    gulp.src(imgSrc)
        .pipe(changed(imgDst))
        .pipe(imagemin())
        .pipe(gulp.dest(imgDst));
});

// minify new or changed HTML pages
gulp.task('htmlpage', function() {
    var htmlSrc = './src/*.html',
        htmlDst = './build';

    gulp.src(htmlSrc)
        .pipe(changed(htmlDst))
        .pipe(minifyHTML())
        .pipe(gulp.dest(htmlDst));
});

// JS strip debugging and minify
gulp.task('scripts', function() {
    var jsSrc = './src/scripts/*.js',
        jsDst = './build/scripts/';

    gulp.src(jsSrc)
        .pipe(stripDebug())
        .pipe(uglify())
        .pipe(gulp.dest(jsDst));
});

// CSS auto-prefix and minify
gulp.task('styles', function() {
    var cssSrc = './src/css/*.css',
        cssDst = './build/css';

    gulp.src(cssSrc)
        .pipe(autoprefix('last 2 versions'))
        .pipe(cleanCSS())
        .pipe(gulp.dest(cssDst));
});


// default task:
// applies minification and other build tasks to code/images then watches for additional changes
gulp.task('default', ['imagemin', 'htmlpage', 'scripts', 'styles'], function() {
    // watch for HTML changes
    gulp.watch('./src/*.html', function() {
        gulp.run('htmlpage');
    });

    // watch for JS changes
    gulp.watch('./src/js/*.js', function() {
        gulp.run('scripts');
    });

    // watch for CSS changes
    gulp.watch('./src/css/*.css', function() {
        gulp.run('styles');
    });
});
