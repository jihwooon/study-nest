const path = require('node:path')

module.exports = (options) => {
    const dirname = path.dirname(options.entry)
    const basename = path.basename(dirname)

    const output = {
        ...options,
        entry: path.resolve(dirname, 'main.ts'),
        output: {
            path: path.resolve(__dirname, `./_output/dist/${basename}`),
            filename: 'index.js'
        }
    }

    return output
}
