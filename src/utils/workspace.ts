import { Rule, Tree } from '@angular-devkit/schematics'
import { getWorkspace, updateWorkspace } from '@schematics/angular/utility/config'
import { WorkspaceSchema } from '@schematics/angular/utility/workspace-models'

function reorder(workspace: WorkspaceSchema, order: (keyof WorkspaceSchema)[]): WorkspaceSchema {
    const reducer = (prev: WorkspaceSchema, key: keyof WorkspaceSchema) => {
        if (workspace[key]) {
            prev[key] = workspace[key]
        }

        return prev
    }

    return order.reduce<WorkspaceSchema>(reducer, {} as any)
}

export function updateWorkspaceFile(updater: (content: WorkspaceSchema) => WorkspaceSchema): Rule {
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
