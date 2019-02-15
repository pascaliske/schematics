import {
    Rule,
    Tree,
    chain,
    externalSchematic,
    SchematicsException,
} from '@angular-devkit/schematics'
import { getWorkspace } from '@schematics/angular/utility/config'
import { getProject, buildDefaultPath } from '@schematics/angular/utility/project'
import { parseName } from '@schematics/angular/utility/parse-name'
import { renderTemplates } from '../../utils/templates'
import { conditional } from '../../utils/rules'
import { ComponentSchema } from './component.schema'

/**
 * Generate a new Angular component including Storybook related files.
 *
 * @param options - The schematic options
 * @returns - A schematic rule
 */
export default function(options: ComponentSchema): Rule {
    return (tree: Tree) => {
        const workspace = getWorkspace(tree)
        const id = options.project || workspace.defaultProject

        if (!id || id.length === 0) {
            throw new SchematicsException('Could not determine project!')
        }

        const project = getProject(tree, id)
        const location = parseName(buildDefaultPath(project), options.name)

        return chain([
            externalSchematic('@schematics/angular', 'component', options),
            conditional(!options.skipStory, [
                renderTemplates('./files', location.path, {
                    params: options,
                }),
            ]),
        ])
    }
}
