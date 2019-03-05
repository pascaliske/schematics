import { Rule, chain } from '@angular-devkit/schematics'
import { NodeDependencyType } from '@schematics/angular/utility/dependencies'
import { conditional } from '../../utils/rules'
import { addDependencies, installDependencies } from '../../utils/dependencies'
import { addScript } from '../../utils/scripts'
import { CypressSchema } from './cypress.schema'

export default function(options: CypressSchema): Rule {
    return chain([
        addDependencies(NodeDependencyType.Dev, ['cypress']),
        conditional(!options.skipScript, [addScript('e2e', 'cypress run')]),
        conditional(!options.skipInstall, [installDependencies()]),
    ])
}
