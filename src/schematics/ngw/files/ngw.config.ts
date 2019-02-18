import { Path } from '@angular-devkit/core'
import { NormalizedBrowserBuilderSchema } from '@angular-devkit/build-angular'
import { join } from 'path'
import { sync } from 'glob'
import { Configuration } from 'webpack'<% if(dashboard) { %>
import * as DashboardPlugin from 'webpack-dashboard/plugin'<% } %><% if (purifyCss) { %>
import * as PurifyCSSPlugin from 'purifycss-webpack'<% } %><% if (visualizer) { %>
import * as VisualizerPlugin from 'webpack-visualizer-plugin'<% } %><% if (versions) { %>
import * as ContentReplacePlugin from 'content-replace-webpack-plugin'<% } %>

export interface WebpackOptions<T = NormalizedBrowserBuilderSchema> {
    root: Path
    projectRoot: Path
    options: T
}
<% if (versions) { %>
// tslint:disable-next-line
const pkg = require('./package.json')<% } %>
const command = process.argv[2].toLowerCase()

export default function(config: Configuration): Configuration {<% if (dashboard) { %>
    config.plugins.push(new DashboardPlugin())
<% } %>
    if (command === 'build') {
        config.plugins.push(<% if (purifyCss) { %>
            new PurifyCSSPlugin({
                paths: sync(join(__dirname, '**/*.html')),
            }),<% } %><% if (visualizer) { %>
            new VisualizerPlugin({
                filename: './stats.html',
            }),<% } %>
        )
    }<% if (versions) { %>

    config.plugins.push(
        new ContentReplacePlugin({
            rules: {
                '*': (bundle: string) => {
                    return bundle.replace(new RegExp('APP_VERSION', 'g'), `v${pkg.version}`)
                },
            },
        }),
    )<% } %>

    return config
}
