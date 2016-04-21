var gulp = require("gulp");
var del = require("del");
var fs = require("fs");
var jspm = require("gulp-jspm");
var uglify = require("gulp-uglify");
var htmlreplace = require("gulp-html-replace");
var minifycss = require("gulp-minify-css");
var rename = require("gulp-rename");
var debug = require("gulp-debug");
var htmlmin = require("gulp-htmlmin");
var concat = require("gulp-concat");

gulp.task("buildjs", function() {
  try {
    fs.mkdirSync("dist");
  } catch (e) {
    console.log("dist file already exists.")
  }
  del("dist/**");
  return gulp.src("app/main.js")
    .pipe(jspm({selfExecutingBundle: true}))
    .pipe(uglify())
    .pipe(rename("app.min.js"))
    .pipe(gulp.dest("dist"));
});

gulp.task("buildcss", function() {
  return gulp.src("css/*.css")
    .pipe(minifycss())
    .pipe(concat("app.min.css"))
    .pipe(gulp.dest("dist"));
});

gulp.task("inject", function() {
  return gulp.src("index.html")
    .pipe(htmlreplace({
      "css": "app.min.css",
      "js": "app.min.js",
      "dev": ""
    }))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest("dist"));
});

gulp.task("copymodels", function() {
    return gulp.src(["models/**/*"]).pipe(gulp.dest("dist/models"));
});


gulp.task("default", ["buildjs", "buildcss", "inject", "copymodels"]);
