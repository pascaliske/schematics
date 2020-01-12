export interface TestingSchema {
    skipInstall: boolean
    skipScript: boolean
    baseUrl: string
    projectId: string
    supportFile: string
    pluginsFile: string
    integrationFolder: string
    fixturesFolder: string
    viewportWidth: number
    viewportHeight: number
}
