let gulp        = require('gulp');
let rename      = require('gulp-rename');
let sass        = require('gulp-sass');
let browserSync = require('browser-sync').create();
let reload      = browserSync.reload;

/*
function astyle(done) {
    gulp.src('./styles.less').pipe(less({errorLogToConsole:true, outputStyle:'minified'})).on('error', console.error.bind(console)).pipe(rename({suffix:'.min'})).pipe( gulp.dest('./') );
    done();
}
*/
/*
gulp.task('compile_less', function() {
  gulp.src('./styles.less')
    .pipe(less())
    .pipe(gulp.dest('./'));
}); 
*/
/* Task to watch less changes */
/*
gulp.task('watch-less', function() {  
  gulp.watch('./*.less' , ['compile-less']);
});
*/
function comp() {
  return gulp.src('./styles.scss')
    .pipe(sass({outputStyle : 'compressed'}))
    .pipe(rename({'suffix' : '.min'}))
    .pipe(gulp.dest('./'))
    .pipe(browserSync.stream());
};
function watchscss() {
  gulp.watch('./*.scss' , comp);
};

function serve() {
 
    // Serve files from the root of this project
    browserSync.init({
        server: {
            baseDir: "./"
        },
        port: 8080,
    }); 
    gulp.watch('./*.scss' , comp);
    gulp.watch("./*.js").on("change", reload);
    gulp.watch("./*.html").on("change", reload);
};

/* Task when running `gulp` from terminal */
/*
gulp.task('default', ['watch-less', 'serve']);
*/

//gulp.task(astyle);
//gulp.task('default', gulp.parallel(serve, watchless));
exports.watch = serve;

//gulp.task(serve);
