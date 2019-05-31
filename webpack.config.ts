import { join } from 'path'
import { JsonObject } from '@angular-devkit/core'
import { Configuration, Entry, DefinePlugin } from 'webpack'
import externals from 'webpack-node-externals'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import GenerateJsonWebpackPlugin from 'generate-json-webpack-plugin'
import VisualizerPlugin from 'webpack-visualizer-plugin'
import TerserPlugin from 'terser-webpack-plugin'
import { collection } from './collection'
import { version } from './package.json'

export interface Schematic {
    id: string
    description: string
    aliases?: string[]
    hidden?: boolean
}

const objectify = (f: any) => collection.reduce((p, c) => ({ ...p, ...f(c) }), {})

const buildEntries = (): Entry => {
    return objectify(({ id }: Schematic) => ({
        [id]: join(__dirname, 'src', 'schematics', id, `${id}.ts`),
    }))
}

const buildGlob = (): string => {
    const glob = collection.map(schematic => schematic.id).join(',')

    if (collection.length > 1) {
        return `{${glob}}`
    }

    return glob
}

const buildCollection = (): JsonObject => ({
    $schema: '../node_modules/@angular-devkit/schematics/collection-schema.json',
    extends: ['@schematics/angular'],
    schematics: objectify(({ id, description, aliases, hidden }: Schematic) => ({
        [id]: {
            factory: `./${id}/${id}`,
            schema: `./${id}/${id}.schema.json`,
            description: description || '',
            aliases: aliases || [],
            hidden: hidden || false,
        },
    })),
})

/**
 * Config builder for webpack.
 *
 * @param _ - The webpack environment
 * @param argv - Array of webpack cli arguments
 */
export default (_: any, argv: any): Configuration => ({
    target: 'node',
    devtool: 'cheap-source-map',
    entry: buildEntries(),
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    externals: [
        externals({
            whitelist: ['npm-registry-client'],
        }),
    ],
    plugins: [
        new DefinePlugin({
            VERSION: JSON.stringify(version),
            ENVIRONMENT: JSON.stringify(argv.mode),
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([
            {
                from: join('src', 'schematics', buildGlob(), '*.schema.json'),
                to: join('[1]', '[1].schema.json'),
                test: /([a-zA-Z-]*)\.schema\.json$/,
            },
            {
                from: join('src', 'schematics', buildGlob(), 'files', '**', '*'),
                fromArgs: { nodir: false, dot: true, nobrace: false },
                to: join('[1]', 'files', '[2]'),
                test: /([a-zA-Z-]*)\/files\/(.+)$/,
            },
        ]),
        new GenerateJsonWebpackPlugin('collection.json', buildCollection(), null, 2),
        new VisualizerPlugin({
            filename: 'stats.html',
        }),
    ],
    optimization: {
        minimizer: [new TerserPlugin()],
        noEmitOnErrors: true,
    },
    output: {
        path: join(__dirname, 'dist'),
        filename: '[name]/[name].js',
        libraryTarget: 'commonjs',
    },
    stats: {
        all: false,
        errors: true,
        chunks: true,
    },
})
