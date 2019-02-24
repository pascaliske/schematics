import { storiesOf } from '@storybook/angular'
import { withMarkdownNotes } from '@storybook/addon-notes'
import { withKnobs } from '@storybook/addon-knobs'
import { <%= classify(name) %>Component } from './<%= dasherize(name) %>.component'
import * as <%= classify(name) %>Readme from './<%= dasherize(name) %>.readme.md'

storiesOf('<%= classify(name) %>', module)
    .addDecorator(withMarkdownNotes(<%= classify(name) %>Readme))
    .addDecorator(withKnobs())
    .add('Basic', () => {
        return {
            component: <%= classify(name) %>Component,
            props: {},
        }
    })
