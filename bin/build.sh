#!/bin/bash

HOME=`echo ~`
BUILD_SCRIPT="./build-release.py"
UPLOAD_SCRIPT="./googlecode_upload.py"
PASSWORD_FILE="$HOME/.googlecode"

TAG="$1"
PROJECT="onlinescoring"
TITLE="OnlineScoring $TAG"

GCUSER="$2"

function showUsage()
{
	echo
	echo "--- OnlineScoring Automated Build Script v.0.1 ---"
	echo "Builds a compressed tar archive for OnlineScoring and uploads it to Google Code"
	echo
   	echo "Usage:   $0 <TAG> <USER>"
	echo
	echo "Options:"
	echo "         TAG    The Mercurial tag to use when cloning the repository."
	echo "         USER   The Google Code username to use."
	echo
	echo "Files:"
	echo "         $HOME/.googlecode    A file containing your Google Code password."
	echo
	echo
	echo "For questions and comments please contact Victor Petrov <victor_petrov@harvard.edu";	
}



if [ -z "$TAG" ]; then
	echo "ERROR: Please specify the Mercurial tag to use"
	showUsage
	exit 1
fi

if [ "$1" = "--help" ] || [ "$1" = "-h" ]; then
	showUsage
	exit 0;
fi

if [ -z "$GCUSER" ]; then
	echo "ERROR: Please specify your Google Code username"
	showUsage
	exit 1
fi

if ! [ -f $PASSWORD_FILE ]; then
	echo "ERROR: Please create the file $PASSWORD_FILE with your Google Code password.";
	exit 1;
fi

PASSWORD=`cat $PASSWORD_FILE`

#Generate new distrib file
DISTFILE=`$BUILD_SCRIPT -t $TAG`
if [ $? -ne 0 ]; then
	echo "ERROR: Failed to create the tar archive."
	exit 1
fi

DISTFILE=`echo $DISTFILE | tr '\r\n' ' '`

#Uploading file to Google Code
$UPLOAD_SCRIPT -s "$TITLE" -p $PROJECT -u "$GCUSER" -w "$PASSWORD" -l Featured "$DISTFILE"

if [ "$?" -ne 0 ]; then
	echo "ERROR: Failed to upload $DISTFILE to Google Code."
	exit 1;
fi

exit 0
