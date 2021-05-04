import { Rule, Tree, chain, externalSchematic } from '@angular-devkit/schematics'
import { getWorkspace, buildDefaultPath } from '@schematics/angular/utility/workspace'
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
export default function (options: ComponentSchema): Rule {
    return async (tree: Tree) => {
        const workspace = await getWorkspace(tree)
        const project = workspace.projects.get(options.project as string)
        const defaultPath = project ? buildDefaultPath(project) : ''
        const { name, path } = parseName(options.path || defaultPath, options.name)

        options.name = name
        options.path = path

        return chain([
            externalSchematic('@schematics/angular', 'component', {
                project: options.project,
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
