import { Rule, chain } from '@angular-devkit/schematics'
import { NodeDependencyType } from '@schematics/angular/utility/dependencies'
import { conditional } from '../../utils/rules'
import { addDependencies, installDependencies } from '../../utils/dependencies'
import { renderTemplates } from '../../utils/templates'
import { StorybookSchema } from './storybook.schema'
import { addScript } from '../../utils/scripts'

/**
 * Integrate Storybook into your Angular project.
 *
 * @param options - The schematic options
 * @returns - A schematic rule
 */
export default function(options: StorybookSchema): Rule {
    return chain([
        addDependencies(NodeDependencyType.Dev, [
            '@babel/core',
            '@storybook/addon-actions',
            '@storybook/addon-knobs',
            '@storybook/addon-links',
            '@storybook/addon-notes',
            '@storybook/addon-options',
            '@storybook/angular',
            '@storybook/components',
            '@types/storybook__addon-actions',
            '@types/storybook__addon-links',
            '@types/storybook__addon-notes',
            '@types/storybook__addon-options',
            '@types/webpack',
            'babel-loader',
            'css-loader',
            'style-loader',
        ]),
        renderTemplates('./files', './', {
            params: {
                config: options.config,
                name: options.name,
                theme: options.theme,
            },
        }),
        conditional(!options.skipScript, [
            addScript(
                'storybook',
                `start-storybook --config-dir ${options.config} --port ${options.port}`,
            ),
        ]),
        conditional(!options.skipInstall, [installDependencies()]),
    ])
}
