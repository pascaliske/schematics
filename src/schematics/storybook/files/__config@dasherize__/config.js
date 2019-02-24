import { configure, addDecorator, moduleMetadata } from '@storybook/angular'
import { themes } from '@storybook/components'
import { withNotes } from '@storybook/addon-notes'
import { withOptions } from '@storybook/addon-options'
import { repository } from '../package.json'

const load = require.context('../projects', true, /.stories.ts$/)

addDecorator(withNotes)
addDecorator(
    withOptions({
        name: '<%= name %>',
        url: repository.url.replace(/.git\/?$/, ''),
        theme: themes.<%= theme %>,
        hierarchySeparator: /\|/,
    }),
)
addDecorator(
    moduleMetadata({
        imports: [],
    }),
)

configure(() => load.keys().forEach(file => load(file)), module)
