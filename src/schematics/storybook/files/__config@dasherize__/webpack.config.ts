import { Configuration } from 'webpack'

/**
 * Tweak the built in webpack config for storybook.
 *
 * @param config - The built in webpack config
 * @returns - The tweaked webpack config
 */
export = (config: Configuration): Configuration => {
    // enable scss loading
    config.module.rules.unshift({
        test: /\.scss$/,
        use: ['style-loader'],
    })

    config.module.rules.unshift({
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
    })

    return config
}
