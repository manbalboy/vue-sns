module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
    },
    parserOptions: {
        parser: 'babel-eslint',
    },
    extends: ['eslint:recommended', 'plugin:vue/recommended', 'plugin:prettier/recommended'],
    plugins: ['vue'],
    rules: {
        'no-console': 'off',
        'prettier/prettier': [
            'error',
            {
                singleQuote: true,
                semi: true,
                useTabs: false,
                tabWidth: 4,
                trailingComma: 'all',
                printWidth: 120,
                bracketSpacing: true,
                arrowParens: 'avoid', //가능하면 생략 , always 항상 써야한다.
                proseWrap: 'preserve',
                jsxBracketSameLine: false,
                htmlWhitespaceSensitivity: 'strict',
                vueIndentScriptAndStyle: true, // script 영역의 들여쓰기  true false
                endOfLine: 'auto',
            },
        ],
    },
};
