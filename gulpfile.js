var gulp = require('gulp'),
    browserify = require('browserify'),
    babel = require('babelify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    rename = require('gulp-rename'),
    watchify = require('watchify'),
    uglify = require('gulp-uglify');

// Obtiene el bundle de Browserify
function getBundle() {
    var options = {
        entries: ['./src/index.js'], // Punto de entrada
        debug: true // Source Maps
    };
    var bundle = browserify(options);

    // configuración Babel + React
    bundle.transform(babel.configure({presets: ["es2015", "react"]}));
    return bundle;
}

function executeBundle(bundle) {
    return bundle
        .bundle() // Ejecuta Browserify
        .on("error", function (err) {
            console.log("Error : " + err.message);
        }) // Muestra un mensaje en caso de error
        .pipe(source('index.js')) // Recoge index.js y lo convierte a vinyl
        .pipe(rename('app.js')) // Renombra el archivo a app.js
        .pipe(gulp.dest('./build')); // Lo guardamos en build
}


gulp.task('bundle', function () {
    // Sólo ejecuta el bundle
    var bundle = getBundle();
    return executeBundle(bundle);
});

gulp.task( 'default', ['bundle'],  function() {
    // Recogemos el fichero del bundle creado y lo comprimimos
    return gulp.src(['./build/app.js'])
        .pipe(uglify()) // Comprimimos
        .pipe(gulp.dest('./build'));
});


gulp.task('watch', function () {
    var bundle = getBundle();

    // Convertimos el bundle en un watcher
    bundle = watchify(bundle);

    bundle
        .on('update', function (file) {
            // Algún fichero se ha actualizado
            console.log("Updated file. Bundling...");
            console.log(file);
            executeBundle(bundle);
        })
        .on('log', function (msg) {
            // Fin del proceso, mostrar un mensaje con el tiempo que se ha tardado
            console.log(msg);
        });

    return executeBundle(bundle);
});


