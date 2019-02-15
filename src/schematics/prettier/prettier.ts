import { Rule, chain, Tree } from '@angular-devkit/schematics'
import { NodeDependencyType } from '@schematics/angular/utility/dependencies'
import { conditional } from '../../utils/rules'
import { addDependencies, installDependencies } from '../../utils/dependencies'
import { renderTemplates } from '../../utils/templates'
import { addScript } from '../../utils/scripts'
import { createFile, updateFile } from '../../utils/files'
import { PrettierSchema } from './prettier.schema'

/**
 * Integrate Prettier formatting into your Angular project.
 *
 * @param options - The schematic options
 * @returns - A schematic rule
 */
export default function(options: PrettierSchema): Rule {
    const hasExcludes = () => options.excludes && options.excludes.split(',').length > 0

    return chain([
        addDependencies(NodeDependencyType.Dev, ['prettier', 'tslint-config-prettier']),
        renderTemplates('./files', './', {
            filter: path => {
                // skip .prettierignore if no excludes are set
                if (!hasExcludes() && path.match(/\.prettierignore/)) {
                    return false
                }

                // skip .lintstagedrc if hooks are disabled
                if (options.skipHook && path.match(/\.lintstagedrc/)) {
                    return false
                }

                return true
            },
            params: {
                excludes: hasExcludes() ? options.excludes.split(',') : [],
                files: options.files,
                printWidth: options.printWidth,
                useTabs: options.useTabs,
                tabWidth: options.tabWidth,
                trailingComma: options.trailingComma,
                arrowParens: options.arrowParens,
                semi: options.semi,
                singleQuote: options.singleQuote,
                bracketSpacing: options.bracketSpacing,
            },
        }),
        conditional(!options.skipScript, [
            addScript('format', `prettier --config .prettierrc --write \"${options.files}\"`),
        ]),
        conditional(!options.skipHook, [
            addDependencies(NodeDependencyType.Dev, ['husky', 'lint-staged']),
        ]),
        conditional((tree: Tree) => !options.skipHook && !tree.exists('.huskyrc'), [
            createFile('.huskyrc', () => {
                return JSON.stringify({
                    hooks: {
                        'pre-commit': 'lint-staged',
                    },
                })
            }),
        ]),
        conditional((tree: Tree) => !options.skipHook && tree.exists('.huskyrc'), [
            updateFile('.huskyrc', (content: string) => {
                const parsed = JSON.parse(content)

                parsed.hooks['pre-commit'] = 'lint-staged'

                return JSON.stringify(parsed, null, 2)
            }),
        ]),
        conditional(!options.skipInstall, [installDependencies()]),
    ])
}
