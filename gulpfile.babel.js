import gulp from "gulp";
import gulpSass from "gulp-sass";
import nodeSass from "node-sass";
import autoprefixer from 'gulp-autoprefixer';
import minifyCSS from "gulp-csso";

const sass = gulpSass(nodeSass);

const paths = {
    styles: {
        src: "asset/scss/style.scss",
        dest: "src/static/styles",
        watch: "asset/scss/**/**.scss",
    }
}

function styles() {
    return gulp
        .src(paths.styles.src)
        .pipe(sass())
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(minifyCSS())
        .pipe(gulp.dest(paths.styles.dest));
}

/* 매번 업데이트 해야하는 번거로움 감소 */
function watchFiles() {
    gulp.watch(paths.styles.watch, styles);
}

const dev = gulp.series([styles, watchFiles]);

export default dev;