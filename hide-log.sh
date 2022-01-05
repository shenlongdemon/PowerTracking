#!/bin/sh
OS="`uname`"

rm -rf ./.babelrc
cp ./.babelrc_release ./.babelrc

sed -i -e "s/IS_DEBUGGER=true/IS_DEBUGGER=false/g" ./.env.staging

sed -i -e "s/  console.log/  \/\/ console.log/g" ./core_app/common/Logger.ts

if  [[ $OS == MIN* ]]
then
  npm cache clean --force
else
  rm ./.env.staging-e
  rm ./.env.prod-e
  rm ./core_app/common/Logger.ts-e
fi