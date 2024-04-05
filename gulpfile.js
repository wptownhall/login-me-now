var  project    = require('./package.json'),
gulp            = require('gulp'),
wpPot           = require('gulp-wp-pot'),
clean           = require('gulp-clean'),
zip             = require('gulp-zip');

gulp.task('pot', function () {
	return gulp.src(['**/*.php', '!__*/**', '!src/**', '!assets/**'])
	.pipe(wpPot( {
		domain: project.name,
		bugReport: 'halalbrains@gmail.com',
		team: 'WPtownhall <halalbrains@gmail.com>'
	} ))
	.pipe(gulp.dest('languages/'+project.name+'.pot'));
});

gulp.task('clean', function () {
	return gulp.src('__build/*.*', {read: false})
	.pipe(clean());
});

gulp.task('zip', function () {
	return gulp.src(
		[
			'**',
			'!__*/**',
			'!node_modules/**',
			'!**/node_modules/**',
			'!src/**',
			'!gulpfile.js',
			'!.DS_Store',
			'!package.json',
			'!package-lock.json',
			'!todo.txt',
			'!README.md',
			'!sftp-config.json',
			'!app/Admin/Assets/src/**',
			'!app/Admin/package-lock.json',
			'!app/Admin/package.json',
			'!app/Admin/postcss.config.js',
			'!app/Admin/tailwind.config.js',
			'!app/Admin/webpack.config.js',
			'!testing.html',
			'!Tests',
			'!Tests/**'
		], { base: '..' })
	.pipe(zip(project.name+'.zip'))
	.pipe(gulp.dest('__build'));
});

gulp.task('build', gulp.series('pot','clean','zip'));