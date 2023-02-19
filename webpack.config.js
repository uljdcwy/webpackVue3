const path = require("path");

module.exports = (env) => {
    return {
        entry: './pages/testj.js',
        target: 'web',
        mode: env?.production ? 'production' : 'development',
        resolve: {
            fallback: {
                'path': false
            },
        },
        resolveLoader: {
            modules: ['node_modules', path.resolve(__dirname, 'webpackLoads')],
        },
        module: {
            rules: [
                {
                    test: /\.js$/i,
                    use: ['clearPrint'],
                },
            ],
        },
        output: {
            filename: './js/[name].js',
            path: path.resolve(__dirname, 'dist'),
            clean: true,
        }
    }
}