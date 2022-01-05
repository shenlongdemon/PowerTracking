sh ./hide-log.sh
rm ./.babelrc
cp ./.babelrc-release ./.babelrc
npm run clear
rm -f ./android/app/src/main/assets/index.android.bundle
react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/
rm -f ./android/app/build/outputs/apk/debug/*.apk && rm -rf ./android/app/build/outputs/apk/release/*.apk
find android/app/src/main/res/raw android/app/src/main/res/drawable-xxxhdpi android/app/src/main/res/drawable-xxhdpi android/app/src/main/res/drawable-xhdpi android/app/src/main/res/drawable-mdpi android/app/src/main/res/drawable-hdpi -type f ! -name launch_screen* -delete
cd ./android && ./gradlew assembleRelease