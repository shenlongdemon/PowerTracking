#!/bin/sh
OS="`uname`"

ENVFILE=.env.dev react-native run-android --variant=devDebug --appIdSuffix=dev

