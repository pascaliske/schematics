export interface StorybookSchema {
    skipInstall: boolean
    skipScript: boolean
    name: string
    theme: 'normal' | 'dark'
    port: number
}
