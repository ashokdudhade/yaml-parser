
const gulp = require("gulp");
const tsc = require("gulp-typescript");
const tsProject = tsc.createProject("tsconfig.json");
const tslint = require('gulp-tslint');
const sourcemaps = require('gulp-sourcemaps');
const del = require("del");

gulp.task('clean', (cb) => {
    return del(["build"], cb);
});

gulp.task('tslint', () => {
    return gulp.src("src/**/*.ts")
        .pipe(tslint({
            formatter: 'prose'
        }))
        .pipe(tslint.report());
});

gulp.task("compile", ["tslint"], () => {
    var tsResult = gulp.src("src/**/*.ts")
        .pipe(sourcemaps.init())
        .pipe(tsProject());
    return tsResult.js
        .pipe(sourcemaps.write(".", {sourceRoot: '/src'}))
        .pipe(gulp.dest("build"));
});

gulp.task("resources", () => {
    return gulp.src(["src/**/*", "!**/*.ts"])
        .pipe(gulp.dest("build"));
});

gulp.task("build", ['compile', 'resources'], () => {
    console.log("Building the project ...");
});