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
]
