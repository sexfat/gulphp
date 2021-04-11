
const {
    src,
    series,
    dest,
    parallel,
    watch
} = require('gulp');

const browsersync = require("browser-sync");
const phpConnect = require('gulp-connect-php');

//Php connect
function connectsync() {
    phpConnect.server({
        // a standalone PHP server that browsersync connects to via proxy
        port: 8000,
        keepalive: true,
        base: "dist"
    }, function (){
        browsersync({
            proxy: '127.0.0.1:8000'
        });
    });
}

// BrowserSync Reload
function browserSyncReload(done) {
    browsersync.reload();
    done();
}

function php(){
    return src("./src/*.php").pipe(dest("./dist"));
}

// Watch files
function watchFiles() {
    watch("src/*.php", series(php, browserSyncReload));
}

const watcher = parallel([watchFiles, connectsync]);

exports.default = watcher;
