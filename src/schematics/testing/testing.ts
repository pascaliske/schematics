import { Rule, chain } from '@angular-devkit/schematics'
import { getWorkspace } from '@schematics/angular/utility/config'
import { NodeDependencyType } from '@schematics/angular/utility/dependencies'
import { conditional } from '../../utils/rules'
import { addDependencies, removeDependencies, installDependencies } from '../../utils/dependencies'
import { renderTemplates } from '../../utils/templates'
import { addScript } from '../../utils/scripts'
import { createFile, deleteFiles, updateFile } from '../../utils/files'
import { updateWorkspaceFile, getProjectName } from '../../utils/workspace'
import { TestingSchema } from './testing.schema'

export default function(options: TestingSchema): Rule {
    return chain([
        removeDependencies([
            'protractor',
            'karma',
            'karma-chrome-launcher',
            'karma-coverage-istanbul-reporter',
            'karma-jasmine',
            'karma-jasmine-html-reporter',
        ]),
        addDependencies(NodeDependencyType.Dev, [
            '@angular-builders/jest',
            '@types/jest',
            'cypress',
            'jest',
            'ngx-cypress-builder',
        ]),
        renderTemplates('./files', './', {
            params: {
                baseUrl: options.baseUrl,
                projectId: options.projectId,
                supportFile: options.supportFile,
                pluginsFile: options.pluginsFile,
                integrationFolder: options.integrationFolder,
                fixturesFolder: options.fixturesFolder,
                viewportWidth: options.viewportWidth,
                viewportHeight: options.viewportHeight,
            },
        }),
        createFile(`${options.integrationFolder}/.gitkeep`, () => ''),
        deleteFiles(['./karma.conf.js', './e2e/', './src/test.ts']),
        conditional(!options.skipScript, [
            addScript('e2e', 'cypress run'),
            addScript('test', 'jest'),
        ]),
        conditional(!options.skipInstall, [installDependencies()]),
        updateWorkspaceFile((workspace, tree) => {
            const { projects } = workspace
            const id = getProjectName(options, getWorkspace(tree))

            if (projects[id]?.architect?.test) {
                // @ts-ignore
                projects[id].architect.test = {
                    builder: '@angular-builders/jest:run',
                    options: {
                        configPath: 'jest.config.json',
                    },
                } as any
            }

            if (projects[id]?.architect?.e2e) {
                // @ts-ignore
                projects[id].architect.e2e = {
                    builder: 'ngx-cypress-builder:cypress',
                    options: {
                        devServerTarget: `${id}:serve`,
                    },
                    configurations: {
                        production: {
                            devServerTarget: `${id}:serve:production`,
                        },
                    },
                } as any
            }

            return { ...workspace, projects }
        }),
        updateFile('./tsconfig.spec.json', raw => {
            try {
                // tslint:disable-next-line
                let { compilerOptions = {}, files = [], ...parsed } = JSON.parse(raw)

                compilerOptions.esModuleInterop = true
                compilerOptions.types = compilerOptions?.types.map((type: string) => {
                    return type && type === 'jasmine' ? 'jest' : type
                })

                files = files.filter((file: string) => {
                    return file !== 'src/test.ts'
                })

                return JSON.stringify({ ...parsed, compilerOptions }, null, 2)
            } catch {
                return raw
            }
        }),
    ])
}
