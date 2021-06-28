// .storybook/main.js

const path = require('path');
module.exports = {
  "stories": [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
      "./register.js"
  ],
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // Make whatever fine-grained changes you need
    config.module.rules.push({
      // The block type: <include-source>
      resourceQuery: /blockType=include-source/,
      // The custom loader: source-loader.js file in the current directory
      loader: path.resolve(__dirname, 'source-loader.js'),
      // Pass the repo's root path in the loader options to resolve the
      // relative source file paths
      options: {
        rootPath: path.resolve(__dirname, '..'),
      },
    });

    // Return the altered config
    return config;
  },
}