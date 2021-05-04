OS="`uname`"

if  [[ $OS == MIN* ]]
then
  npm install --no-optional
else
  npm install
fi

rn-nodeify --install --hack
cp -R ./copy_files/react-native-mqtt/* ./node_modules/react-native-mqtt
cp -R ./copy_files/react-native-tcp/* ./node_modules/react-native-tcp/android/src/main/java/com/peel/react
cp -R ./copy_files/react-native-udp/* ./node_modules/react-native-udp/android/src/main/java/com/tradle/react
