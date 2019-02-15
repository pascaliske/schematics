# Angular Schematics Collection

[![GitHub Tag](https://img.shields.io/github/tag/pascaliske/schematics.svg?style=flat-square)](https://github.com/pascaliske/schematics) [![Travis CI](https://img.shields.io/travis/com/pascaliske/schematics/master.svg?style=flat-square)](https://travis-ci.com/pascaliske/schematics) [![Known Vulnerabilities](https://snyk.io/test/github/pascaliske/schematics/badge.svg?style=flat-square)](https://snyk.io/test/github/pascaliske/schematics) [![Greenkeeper](https://badges.greenkeeper.io/pascaliske/schematics.svg?style=flat-square)](https://greenkeeper.io) [![Awesome Badges](https://img.shields.io/badge/badges-awesome-green.svg?style=flat-square)](https://github.com/Naereen/badges)

> tl:dr; Angular schematics collection for integrating setup tools.

This library contains some basic schematics for scaffolding well known tools like [`prettier`](https://prettier.io), [`storybook`](https://storybook.js.org/) or [`travis`](https://travis-ci.com). It extends the official Angular schematics which allows you to define the collection as your default collection and still use all official Angular schematics (`module`, `service`, etc.).

## Installation

To install the schematics collection use the following command:

```bash
$ ng add @pascaliske/schematics
```

## Schematics

### `component`

Generate a new Angular component including Storybook related files.

```bash
ng generate component <name> [...flags]
```

#### Options

The following options can be used to tweak the result of the schematic. All options you leave out will be prompted interactively.

###### `--name` | `string`

Define a name for the newly generated component.

###### `--skip-story` | `boolean`

Allows you to skip the generation of storybook related files. (Same as running the default component schematic of Angular)

- Default: `false`

### `prettier`

Integrate Prettier formatting into your Angular project.

```bash
ng generate prettier [...flags]
```

#### Options

The following options can be used to tweak the result of the schematic. All options you leave out will be prompted interactively.

###### `--files` | `string`

Define which files are formatted by prettier.

- Default: `src/**/*.{ts,scss,html,md}`

> Note: Don't forget to wrap the string in quotes to prevent resolving globs (`*`, `**`, etc.) through your terminal!

###### `--skip-install` | `boolean`

Skip the installation process of newly added dependencies.

- Default: `false`

###### `--skip-hook` | `boolean`

Don't add a pre-commit hook for running prettier during commit process.

- Default: `false`

###### `--skip-script` | `boolean`

Don't add a script to your `package.json` for easier running prettier.

- Default: `false`

###### `--excludes` | `string`

Add a `.prettierignore` file with exclude rules. Use a comma separated string to add multiple exclude rules.

> Note: Don't forget to wrap the string in quotes to prevent resolving globs (`*`, `**`, etc.) through your terminal!

###### `--print-width` | `number`

Choose a max line width for breaking single lines into multiple.

- Possible values: `80` | `100` | `120` | `140`
- Default: `100`

###### `--use-tabs` | `boolean`

Use tab based indentation instead of the default space based one.

- Default: `false`

###### `--tab-width` | `number`

Specify the number of spaces per indentation-level.

- Possible values: `2` | `4`
- Default: `4`

###### `--trailing-comma` | `string`

Print trailing commas wherever possible when multi-line.

- Possible values: `none` | `es5` | `all`
- Default: `all`

###### `--arrow-parens` | `string`

Include parentheses around a single arrow function parameter.

- Possible values: `avoid`| `always`
- Default: `avoid`

###### `--semi` | `boolean`

Print semicolons at the ends of statements.

- Default: `false`

###### `--single-quote` | `boolean`

Use single quotes instead of double quotes.

- Default: `true`

###### `--bracket-spacing` | `boolean`

Print spaces between brackets in object literals.

- Default: `true`

### `commit-lint`

Integrate commit linting into your Angular project.

```bash
ng generate commit-lint [...flags]
```

#### Options

The following options can be used to tweak the result of the schematic. All options you leave out will be prompted interactively.

###### `--skip-install` | `boolean`

Skip the installation process of newly added dependencies.

- Default: `false`

###### `--preset` | `string`

Specify the preset that the linter will use.

- Possible values: `conventional`
- Default: `conventional`

###### `--header-length` | `number`

Specify the header length that the linter will check.

- Possible values: `100`
- Default: `100`

### `snyk`

Integrate Snyk security testing into your Angular project.

```bash
ng generate snyk [...flags]
```

#### Options

The following options can be used to tweak the result of the schematic. All options you leave out will be prompted interactively.

###### `--skip-install` | `boolean`

Skip the installation process of newly added dependencies.

- Default: `false`

###### `--skip-script` | `boolean`

Don't add a script to your `package.json` for easier running snyk.

- Default: `false`

### `travis`

Integrate Travis CI into your Angular project.

```bash
ng generate travis [...flags]
```

#### Options

The following options can be used to tweak the result of the schematic. All options you leave out will be prompted interactively.

###### `--versions` | `string`

Specify which versions the Travis CI file should contain. To specify multiple versions use a comma separated string.

###### `--package-manager` | `string`

Specify the package manger to be used in your Travis CI file.

- Possible values: `yarn` | `npm`
- Default: `yarn`

### `storybook`

Integrate Storybook into your Angular project.

```bash
ng generate storybook [...flags]
```

#### Options

The following options can be used to tweak the result of the schematic. All options you leave out will be prompted interactively.

###### `--skip-install` | `boolean`

Skip the installation process of newly added dependencies.

- Default: `false`

###### `--skip-script` | `boolean`

Don't add a script to your `package.json` for easier running storybook.

- Default: `false`

###### `name` | `string`

Specify the name of your storybook.

###### `theme` | `string`

Specify the theme for storybook.

- Possible values: `normal` | `dark`
- Default: `dark`

###### `port` | `number`

Specify the port for storybook.

- Default: `9001`

## License

MIT © [Pascal Iske](https://pascal-iske.de)
