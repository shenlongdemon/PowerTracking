rm ./.babelrc
cp ./.babelrc-dev ./.babelrc
npm run clear
npx react-native start --reset-cache