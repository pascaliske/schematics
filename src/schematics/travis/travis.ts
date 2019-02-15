import { Rule, chain } from '@angular-devkit/schematics'
import { TravisSchema } from './travis.schema'
import { renderTemplates } from '../../utils/templates'

/**
 * Integrate Travis CI into your Angular project.
 *
 * @param options - The schematic options
 * @returns - A schematic rule
 */
export default function(options: TravisSchema): Rule {
    return chain([
        renderTemplates('./files', './', {
            params: {
                versions: options.versions.length > 0 ? options.versions.split(',') : [],
                useYarn: options.packageManager === 'yarn',
            },
        }),
    ])
}
