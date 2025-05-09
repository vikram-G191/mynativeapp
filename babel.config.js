module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',  // You can name the module anything you'd like
        path: '.env',         // This is the default .env file
      },
    ],
    'transform-inline-environment-variables', // Inline environment variables
  ],
};
