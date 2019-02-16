export interface StorybookSchema {
    skipInstall: boolean
    skipScript: boolean
    config: string
    name: string
    theme: 'normal' | 'dark'
    port: number
}
