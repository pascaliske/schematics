export interface StorybookSchema {
    skipInstall: boolean
    skipScript: boolean
    config: string
    name: string
    theme: 'light' | 'dark'
    port: number
}
