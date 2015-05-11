var gulp = require('gulp'),     
	sass = require('gulp-ruby-sass') ,
	notify = require("gulp-notify") ,
	bower = require('gulp-bower'),
	child_process = require('child_process');

var config = {
	 sassPath: './resources/sass',
	bowerDir: './bower_components' 
}

gulp.task('servers', function() { 
    child_process.exec('mongod', function(err,stdout,stderr){
    	console.log(stdout);
    });
    child_process.exec('node app.js', function(err,stdout,stderr){
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

gulp.task('css', function() { 
    return gulp.src(config.sassPath + '/default.scss')
         .pipe(sass({
             style: 'compressed',
             loadPath: [
                 './resources/sass',
                 config.bowerDir + '/bootstrap-sass-official/assets/stylesheets',
                 config.bowerDir + '/fontawesome/scss',
             ]
         }) 
            .on("error", notify.onError(function (error) {
                 return "Error: " + error.message;
             }))) 
         .pipe(gulp.dest('./public/inc/css')); 
});

// Rerun the task when a file changes
 gulp.task('watch', function() {
     gulp.watch(config.sassPath + '/**/*.scss', ['css']); 
});

  gulp.task('default', ['bower', 'icons', 'css']);