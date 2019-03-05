export interface ComponentSchema {
    name: string
    project: string
    style: 'css' | 'scss' | 'sass' | 'less' | 'styl'
    skipStory: boolean
}
