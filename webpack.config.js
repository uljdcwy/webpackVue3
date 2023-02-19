const path = require("path");

module.exports = (env) => {
    console.log(env,"“")
    return {
        entry: './pages/testj.js',
        target: 'web',
        mode: env?.production ? 'production' : 'development',
        optimization: {
            splitChunks: {
                chunks: 'all',
            },
        },
        resolve: {
            fallback: {
                'path': false
            },
        },
        output: {
            filename: './js/[name].js',
            path: path.resolve(__dirname, 'dist'),
            clean: true,
        }
    }
}