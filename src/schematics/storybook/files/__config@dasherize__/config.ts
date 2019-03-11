import { configure, addDecorator, addParameters, moduleMetadata } from '@storybook/angular'
import { withKnobs } from '@storybook/addon-knobs'
import { create } from '@storybook/theming'
import { <% if (!name) { %>name, <% } %>repository } from '../package.json'

const load = require.context('../projects', true, /.stories.ts$/)

addDecorator(withKnobs)
addDecorator(
    moduleMetadata({
        imports: [],
    }),
)
addParameters({
    options: {
        theme: create({
            base: '<%= theme %>',
            brandTitle: <% if (name) { %>'<%= name %>'<% } else { %>name<% } %>,
            brandUrl: repository.url.replace(/.git\/?$/, ''),
        }),
        panelPosition: 'bottom',
        hierarchySeparator: /\//,
        sortStoriesByKind: true,
    },
})

configure(() => load.keys().forEach(file => load(file)), module)
