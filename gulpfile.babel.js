import gulp from "gulp";
import gulpSass from "gulp-sass";
import nodeSass from "node-sass";
import autoprefixer from 'gulp-autoprefixer';
import minifyCSS from "gulp-csso";
import del from "del";
import browserify from "gulp-browserify";
import babel from "babelify"; // babelify: browserify 변환

const sass = gulpSass(nodeSass);

const paths = {
    styles: {
        src: "asset/scss/style.scss",
        dest: "src/static/styles",
        watch: "asset/scss/**/**.scss",
    },
    js: {
        src: "asset/js/main.js",
        dest: "src/static/js",
        watch: "asset/js/**/*.js",
    }
}

const clean = () => del(["src/static"]);

const styles = () =>
    gulp
        .src(paths.styles.src)
        .pipe(sass())
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(minifyCSS())
        .pipe(gulp.dest(paths.styles.dest));

const js = () =>
    gulp
        .src(paths.js.src)
        .pipe(
            browserify({
                transfrom: [
                    babel.configure({
                        presets: ["@babel/preset-env"]
                    })
                ]
            }))
        .pipe(gulp.dest(paths.js.dest));

/* 매번 업데이트 해야하는 번거로움 감소 */
const watchFiles = () => {
    gulp.watch(paths.styles.watch, styles);
    gulp.watch(paths.js.watch, js);
}

const dev = gulp.series(clean, styles, watchFiles);

export default dev;