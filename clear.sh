 rm -fr $TMPDIR/core_app*
 rm -fr $TMPDIR/react*
 rm -fr $TMPDIR/metro*
 watchman watch-del-all
 cd android && ./gradlew clean && cd ..
npm cache verify && npm cache clean --force && rm -rf **/build/* && rm -rf **/.idea/*
  rm -rf ./android/.gradle
  rm -rf ./android/build
  rm -rf ./android/app/build
  rm -rf ./android/app/src/debug







