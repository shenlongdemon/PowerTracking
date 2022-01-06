#!/bin/sh
OS="`uname`"
sh ./hide-log.sh && sh ./prepare-android-bundle.sh && sh ./rm-dup-files.sh && cd ./android && ENVFILE=.env.staging && ./gradlew assembleRelease