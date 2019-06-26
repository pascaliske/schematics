export interface ComponentSchema {
    name: string
    project: string
    path: string
    style: 'css' | 'scss' | 'sass' | 'less' | 'styl'
    spec: boolean
    flat: boolean
    export: boolean
    skipStory: boolean
}
