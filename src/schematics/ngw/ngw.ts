import { Rule, chain } from '@angular-devkit/schematics'
import { NodeDependencyType } from '@schematics/angular/utility/dependencies'
import { conditional } from '../../utils/rules'
import { addDependencies, installDependencies } from '../../utils/dependencies'
import { renderTemplates } from '../../utils/templates'
import { NgwSchema } from './ngw.schema'
import { addScript } from '../../utils/scripts'

export default function(options: NgwSchema): Rule {
    return chain([
        addDependencies(NodeDependencyType.Dev, [
            '@types/node',
            '@types/webpack',
            'ngw',
            'webpack',
        ]),
        renderTemplates('./files', './', {
            params: {
                dashboard: options.dashboard,
                visualizer: options.visualizer,
                purifyCss: options.purifyCss,
                versions: options.versions,
            },
        }),
        conditional(!options.skipScript, [
            addScript('ng', 'ngw'),
            addScript('start', 'ngw serve'),
            addScript('build', 'ngw build'),
            addScript('test', 'ngw test'),
            addScript('lint', 'ngw lint'),
            addScript('e2e', 'ngw e2e'),
        ]),
        conditional(options.dashboard, [
            addDependencies(NodeDependencyType.Dev, ['webpack-dashboard/plugin']),
        ]),
        conditional(options.visualizer, [
            addDependencies(NodeDependencyType.Dev, ['webpack-visualizer-plugin']),
        ]),
        conditional(options.purifyCss, [
            addDependencies(NodeDependencyType.Dev, ['purify-css', 'purifycss-webpack']),
        ]),
        conditional(options.versions, [
            addDependencies(NodeDependencyType.Dev, ['content-replace-webpack-plugin']),
        ]),
        conditional(!options.skipInstall, [installDependencies()]),
    ])
}
