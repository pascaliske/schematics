import { storiesOf } from '@storybook/angular'
import { text } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import { <%= classify(name) %>Component } from './<%= dasherize(name) %>.component'
import <%= classify(name) %>Readme from './<%= dasherize(name) %>.readme.md'

storiesOf('<%= classify(name) %>', module)
    .addParameters({ notes: <%= classify(name) %>Readme })
    .add('Basic', () => ({
        component: <%= classify(name) %>Component,
        props: {},
    }))
