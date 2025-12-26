// module.exports = {
//   presets: ['module:@react-native/babel-preset', 'nativewind/babel'],
// };

/** @type {import('react-native-worklets/plugin').PluginOptions} */
const workletsPluginOptions = {
  // Your custom options.
};

module.exports = {
  presets: ['module:@react-native/babel-preset', 'nativewind/babel'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
        safe: false,
        allowUndefined: true,
      },
    ],
    'react-native-reanimated/plugin',
  ],
  // plugins: [
  //   [
  //     'module:react-native-dotenv',
  //     {
  //       moduleName: '@env',
  //       path: '.env',
  //     },
  //   ],
  //   'react-native-reanimated/plugin',
  // ],
};