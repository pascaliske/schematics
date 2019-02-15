import { Rule, chain, Tree } from '@angular-devkit/schematics'
import { NodeDependencyType } from '@schematics/angular/utility/dependencies'
import { conditional } from '../../utils/rules'
import { addDependencies, installDependencies } from '../../utils/dependencies'
import { renderTemplates } from '../../utils/templates'
import { createFile, updateFile } from '../../utils/files'
import { CommitLintSchema } from './commit-lint.schema'

/**
 * Integrate commit linting into your Angular project.
 *
 * @param options - The schematic options
 * @returns - A schematic rule
 */
export default function(options: CommitLintSchema): Rule {
    return chain([
        addDependencies(NodeDependencyType.Dev, [
            '@commitlint/cli',
            `@commitlint/config-${options.preset}`,
        ]),
        renderTemplates('./files', './', {
            params: {
                headerLength: options.headerLength,
            },
        }),
        conditional((tree: Tree) => !tree.exists('.huskyrc'), [
            createFile('.huskyrc', () => {
                return JSON.stringify({
                    hooks: {
                        'commit-msg': 'commitlint --env HUSKY_GIT_PARAMS',
                    },
                })
            }),
        ]),
        conditional((tree: Tree) => tree.exists('.huskyrc'), [
            updateFile('.huskyrc', (content: string) => {
                const parsed = JSON.parse(content)

                parsed.hooks['commit-msg'] = 'commitlint --env HUSKY_GIT_PARAMS'

                return JSON.stringify(parsed, null, 2)
            }),
        ]),
        conditional(!options.skipInstall, [installDependencies()]),
    ])
}
