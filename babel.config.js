// module.exports = {
//   presets: ['module:@react-native/babel-preset'],
//   // plugins: ['nativewind/babel','react-native-reanimated/plugin'],
//   // plugins: ['react-native-reanimated/plugin'],
// };
module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: ['nativewind/babel','react-native-reanimated/plugin','module-resolver'],
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@src': './src',
        },
      },
    ],
    'react-native-reanimated/plugin'  // Make sure this is the last plugin
  ],
};
