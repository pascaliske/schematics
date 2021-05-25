module.exports = {
    root: true,
    extends: '@pascaliske/eslint-config/typescript',
    parserOptions: {
        project: `${__dirname}/tsconfig.json`,
        createDefaultProgram: true,
    },
    env: {
        node: true,
    },
}
