#!/bin/sh
OS="`uname`"

ENVFILE=.env.prod react-native run-android --variant=prodDebug --appIdSuffix=prod

