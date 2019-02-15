import { Rule, chain } from '@angular-devkit/schematics'
import { NodeDependencyType } from '@schematics/angular/utility/dependencies'
import { conditional } from '../../utils/rules'
import { updateWorkspaceFile } from '../../utils/workspace'
import { addDependencies, installDependencies } from '../../utils/dependencies'
import { NgAddSchema } from './ng-add.schema'

/**
 * Add the schematic collection to your Angular project.
 *
 * @param options - The schematic options
 * @returns - A schematic rule
 */
export default function(options: NgAddSchema): Rule {
    return chain([
        addDependencies(NodeDependencyType.Dev, ['@pascaliske/schematics']),
        updateWorkspaceFile(workspace => {
            const { cli = {} } = workspace

            cli.defaultCollection = '@pascaliske/schematics'
            cli.packageManager = 'yarn'

            return { ...workspace, cli }
        }),
        conditional(!options.skipInstall, [installDependencies()]),
    ])
}
