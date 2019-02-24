import { Rule, chain } from '@angular-devkit/schematics'
import { NodeDependencyType } from '@schematics/angular/utility/dependencies'
import { conditional } from '../../utils/rules'
import { addDependencies, installDependencies } from '../../utils/dependencies'
import { addScript } from '../../utils/scripts'
import { ChangelogSchema } from './changelog.schema'

/**
 * Integrate standard-changelog into your Angular project.
 *
 * @param options - The schematic options
 * @returns - A schematic rule
 */
export default function(options: ChangelogSchema): Rule {
    return chain([
        addDependencies(NodeDependencyType.Dev, ['standard-changelog']),
        conditional(!options.skipScript, [addScript('changelog', 'standard-changelog')]),
        conditional(!options.skipInstall, [installDependencies()]),
    ])
}
