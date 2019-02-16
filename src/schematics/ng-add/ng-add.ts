import { Rule } from '@angular-devkit/schematics'
import { updateWorkspaceFile } from '../../utils/workspace'
import { NgAddSchema } from './ng-add.schema'

/**
 * Add the schematic collection to your Angular project.
 *
 * @param options - The schematic options
 * @returns - A schematic rule
 */
export default function(_options: NgAddSchema): Rule {
    return updateWorkspaceFile(workspace => {
        const { cli = {} } = workspace

        cli.defaultCollection = '@pascaliske/schematics'
        cli.packageManager = 'yarn'

        return { ...workspace, cli }
    })
}
