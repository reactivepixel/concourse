'use strict';

var watchify        = require('watchify'),
    browserify      = require('browserify'),
    source          = require('vinyl-source-stream'),
    buffer          = require('vinyl-buffer'),
    gutil           = require('gulp-util'),
    sourcemaps      = require('gulp-sourcemaps'),
    assign          = require('lodash.assign'),
    reactify        = require('reactify'),
    gulp            = require('gulp'),     
    sass            = require('gulp-ruby-sass') ,
    bower           = require('gulp-bower'),
    child_process   = require('child_process'),
    nodemon         = require('gulp-nodemon'),
    notify          = require("gulp-notify"),
    image 			= require('gulp-image');

var config = {
	 sassPath:   './assets/sass',
    jsPath:     './assets/js',
	bowerDir:   './bower_components', 
    imgPath:    './assets/img'
};
 
var production = process.env.NODE_ENV === 'production';

// add custom browserify options here
var customOpts = {
  entries: ['./assets/js/main.js'],
  debug: true
};

var opts  = assign({}, watchify.args, customOpts),
    b     = watchify(browserify(opts)); 

// add transformations here
b.transform(reactify);

gulp.task('js', bundle); // so you can run `gulp js` to build the file
b.on('update', bundle); // on any dep update, runs the bundler
b.on('log', gutil.log); // output build logs to terminal

function bundle() { // based upon gulpjs recipe - https://github.com/gulpjs/gulp/blob/master/docs/recipes/fast-browserify-builds-with-watchify.md
  return b.bundle()
    // log errors if they happen
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('bundle.js'))
    // optional, remove if you don't need to buffer file contents
    .pipe(buffer())
    // optional, remove if you dont want sourcemaps
    .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
       // Add transformation tasks to the pipeline here.
    .pipe(sourcemaps.write('./')) // writes .map file
    .pipe(gulp.dest('./public/js'));
}

// startup required services to run the app server
gulp.task('mongod', function() { 
    // spawn in a child process mongodb
    child_process.exec('mongod', function(err,stdout,stderr){
    	console.log(stdout);
    });
});

gulp.task('bower', function() { 
    return bower()
         .pipe(gulp.dest(config.bowerDir)) 
});

gulp.task('icons', function() { 
    return gulp.src(config.bowerDir + '/fontawesome/fonts/**.*') 
        .pipe(gulp.dest('./public/inc/fonts')); 
});

gulp.task('dev', function () {
  nodemon({ script: 'app.js'
          , ext: 'html js jsx'
          , ignore: ['ignored.js'] })
    .on('restart', function () {
      console.log('restarted!')
    })
});

gulp.task('image', function () {
    gulp.src('./assets/img/*')
        .pipe(gulp.dest('./public/img'));
});

gulp.task('css', function() { 
    return gulp.src(config.sassPath + '/default.scss')
         .pipe(sass({
             style: 'compressed',
             loadPath: [
                 config. sassPath,
                 config.bowerDir + '/bootstrap-sass-official/assets/stylesheets',
                 config.bowerDir + '/fontawesome/scss'
             ]
         }) 
            .on("error", notify.onError(function (error) {
                 return "Error: " + error.message;
             }))) 
         .pipe(gulp.dest('./public/css')); 
});

// Rerun the task when a file changes
 gulp.task('watch', function() {
     gulp.watch(config.sassPath + '/**/*.scss', ['css']); 
});

  gulp.task('default', ['bower', 'icons', 'css','image','js', 'mongod', 'dev','watch']);