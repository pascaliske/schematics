import { Schematic } from './webpack.config'

/**
 * Configure all implemented schematics.
 */
export const collection: Schematic[] = [
    {
        id: 'ng-add',
        description: 'Add the schematic collection to your Angular project.',
        hidden: true,
    },
    {
        id: 'prettier',
        description: 'Integrate Prettier formatting into your Angular project.',
    },
    {
        id: 'commit-lint',
        description: 'Integrate commit linting into your Angular project.',
    },
    {
        id: 'snyk',
        description: 'Integrate Snyk security testing into your Angular project.',
    },
]
