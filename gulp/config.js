var dest = './build',
    src = './src';

module.exports = {
    browserSync: {
        server: {
            baseDir: [dest, src]
        },
        files: [
            dest + '/**'
        ],
        port: 8080
    },
    less: {
        src: src + '/less/main.less',
        watch: [
            src + '/less/**'
        ],
        dest: dest
    },
    markup: {
        src: src + "/www/**",
        dest: dest
    },
    browserify: {
        // Enable source maps
        debug: true,
        // A separate bundle will be generated for each
        // bundle config in the list below
        bundleConfigs: [{
            entries: src + '/app/app.jsx',
            dest: dest,
            outputName: 'app.js'
        }]
    }
};