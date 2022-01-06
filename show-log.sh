#!/bin/sh
OS="`uname`"

rm -rf ./.babelrc
cp ./.babelrc-dev ./.babelrc

sed -i -e "s/IS_DEBUGGER=false/IS_DEBUGGER=true/g" ./.env.staging

sed -i -e "s/\/\/ console.log/console.log/g" ./core_app/common/Logger.ts

if  [[ $OS == MIN* ]]
then
  npm cache clean --force
else
  rm ./.env.staging-e
  rm ./.env.prod-e
  rm ./core_app/common/Logger.ts-e
fi