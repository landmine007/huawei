let gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const cleaanCSS = require('gulp-clean-css');
const connect = require('gulp-connect');
const babel = require('gulp-babel');
var uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');


// 压缩html
gulp.task('minhtml', function() {
    gulp.src('app/**/*.html')
    .pipe(htmlmin({ collapseWhitespace: true, minifyJS: true, minifyCSS: true }))
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload())
});

// 压缩css
gulp.task('mincss', function() {
    gulp.src('app/css/**/*.css')
    .pipe(cleaanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/css'))
    .pipe(connect.reload())
});

// 压缩js
gulp.task('minjs', function() {
    gulp.src('app/js/**/*.js')
    // es6转ES5
    .pipe(babel({
        presets: ['@babel/env']
    }))
    // 再压缩
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(connect.reload())
});
// 图片压缩
gulp.task('img', () => {
    gulp.src('app/images/*')
        .pipe(imagemin({progressive: true}))
        .pipe(gulp.dest('dist/images'))
});

// 监视文件变动
gulp.task('watch', function() {
    gulp.watch(['app/**/*.html', 'app/**/*.css', 'app/**/*.js'], ['minhtml', 'mincss', 'minjs']);
});

// 用nodejs 开启服务器
gulp.task('sever', function() {
    connect.server({
        // 热更新
        livereload: true,
        // 端口
        // port: 8080,
        // 设置根目录
        root: 'dist'
    });
});
gulp.task('default',['minhtml', 'mincss', 'minjs', 'img', 'watch', 'sever']);