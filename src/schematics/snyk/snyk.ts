import { Rule, chain } from '@angular-devkit/schematics'
import { NodeDependencyType } from '@schematics/angular/utility/dependencies'
import { conditional } from '../../utils/rules'
import { addDependencies, installDependencies } from '../../utils/dependencies'
import { addScript } from '../../utils/scripts'
import { SnykSchema } from './snyk.schema'

/**
 * Integrate Snyk security testing into your Angular project.
 *
 * @param options - The schematic options
 * @returns - A schematic rule
 */
export default function (options: SnykSchema): Rule {
    return chain([
        addDependencies(NodeDependencyType.Dev, ['snyk']),
        conditional(!options.skipScript, [addScript('check', 'snyk test && snyk monitor')]),
        conditional(!options.skipInstall, [installDependencies()]),
    ])
}
