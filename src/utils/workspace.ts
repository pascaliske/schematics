import { Rule, Tree, SchematicsException } from '@angular-devkit/schematics'
import { getWorkspace, updateWorkspace } from '@schematics/angular/utility/config'
import { WorkspaceSchema } from '@schematics/angular/utility/workspace-models'

function reorder(workspace: WorkspaceSchema, order: (keyof WorkspaceSchema)[]): WorkspaceSchema {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const reducer = (prev: WorkspaceSchema, key: keyof WorkspaceSchema): any => {
        if (workspace[key]) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            prev[key as any] = workspace[key]
        }

        return prev
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return order.reduce<WorkspaceSchema>(reducer, {} as any)
}

export function updateWorkspaceFile(updater: (content: WorkspaceSchema) => WorkspaceSchema): Rule {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (tree: Tree): any => {
        const workspace: WorkspaceSchema = getWorkspace(tree)
        const update: WorkspaceSchema = updater(workspace)

        return updateWorkspace(
            reorder(update, [
                '$schema',
                'version',
                'newProjectRoot',
                'defaultProject',
                'cli',
                'schematics',
                'projects',
            ]),
        )
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getProjectName(options: any, workspace: WorkspaceSchema): string {
    if (options.project) {
        return options.project
    }

    if (workspace.defaultProject) {
        return workspace.defaultProject
    }

    if (Object.keys(workspace.projects).length > 0) {
        return Object.keys(workspace.projects)[0]
    }

    throw new SchematicsException('Could not determine project!')
}
