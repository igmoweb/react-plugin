var gulp = require('gulp'),
    browserify = require('browserify'),
    babel = require('babelify'),
    source = require('vinyl-source-stream'),
    rename = require('gulp-rename');

gulp.task('default', function () {
    var options = {
        entries: ['./src/index.js'],
        debug: true
    };
    var bundle = browserify(options);
    bundle.transform(babel.configure({presets: ["es2015", "react"]}));
    return bundle
        .bundle()
        .on("error", function (err) { console.log("Error : " + err.message); })
        .pipe(source('index.js'))
        .pipe(rename('app.js'))
        .pipe(gulp.dest('./build'));
});
