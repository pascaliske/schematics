import { Rule, Tree, chain, externalSchematic } from '@angular-devkit/schematics'
import { getWorkspace } from '@schematics/angular/utility/config'
import { getProject, buildDefaultPath } from '@schematics/angular/utility/project'
import { parseName } from '@schematics/angular/utility/parse-name'
import { getProjectName } from '../../utils/workspace'
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
        const id = getProjectName(options, getWorkspace(tree))
        const project = getProject(tree, id)
        const location = parseName(options.path || buildDefaultPath(project), options.name)

        options.name = location.name
        options.path = location.path

        return chain([
            externalSchematic('@schematics/angular', 'component', {
                project: id,
                name: options.name,
                path: options.path,
                style: options.style,
                spec: options.spec,
                flat: options.flat,
                export: options.export,
            }),
            conditional(!options.skipStory, [
                renderTemplates('./files', options.path, {
                    params: options,
                }),
            ]),
        ])
    }
}
