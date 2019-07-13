
const gulp        = require('gulp');
const browserSync = require('browser-sync').create();
const sass        = require('gulp-sass');
const deploy      = require('gulp-gh-pages');

gulp.task('deploy', function () {
	return gulp.src("./build/**/*")
		.pipe(deploy());
});


gulp.task('sass', function () {
	return gulp.src('assets/sass/**/*.sass')
		.pipe(sass())
		.pipe(gulp.dest('build/css'))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('img', function () {
	return gulp.src('assets/img/**/*')
		.pipe(gulp.dest('build/img'))
		.pipe(browserSync.reload({stream: true}))

});

gulp.task("html", function () {
	return gulp.src("assets/**/*.html")
		.pipe(gulp.dest("build"))
		.pipe(browserSync.reload({stream: true}))
});

gulp.task('watch', gulp.series('sass', "html", 'img',  (done) => {
	browserSync.init({
		server: "./build",
		notify: false,
		ui: {
			port: 3000
		}
	});
	gulp.watch('assets/sass/**/*.sass', gulp.parallel('sass'));
	gulp.watch('assets/**/*.html', gulp.parallel('html'));
	gulp.watch('assets/img/**/*', gulp.parallel('img'));
}));
