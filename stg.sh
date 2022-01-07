#!/bin/sh
OS="`uname`"

ENVFILE=.env.stg react-native run-android --variant=stgDebug --appIdSuffix=stg

