export interface PrettierSchema {
    files: string
    skipInstall: boolean
    skipHook: boolean
    skipScript: boolean
    excludes: string
    printWidth: 80 | 100 | 120 | 140
    useTabs: boolean
    tabWidth: 2 | 4
    trailingComma: 'none' | 'es5' | 'all'
    arrowParens: 'avoid' | 'always'
    semi: boolean
    singleQuote: boolean
    bracketSpacing: boolean
}
