module.exports = {
    env: {
        // 브라우저의 document와 같은 객체 사용 여부
        browser: false,
        // node.js에서 console과 같은 전역변수 사용 여부
        node: true,
    },

    plugins: ['prettier'],
    // extends: ['airbnb'],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parser: 'babel-eslint',
    parserOptions: {
        ecmaVersion: 2020, // needed to support spread in objects
    },
    // ESLint가 무시할 디렉토리, 파일을 설정
    ignorePatterns: ['node_modules/'],
    rules: {
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
                arrowParens: 'avoid', // 가능하면 생략 , always 항상 써야한다.
                proseWrap: 'preserve',
                jsxBracketSameLine: false,
                htmlWhitespaceSensitivity: 'strict',
                vueIndentScriptAndStyle: true, // script 영역의 들여쓰기  true false
                endOfLine: 'auto',
            },
        ],
    },
};
