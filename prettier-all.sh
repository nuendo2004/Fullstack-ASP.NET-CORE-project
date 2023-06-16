#!/bin/bash

# This script will run prettier on all .js files in the client/src directory.
# see Dan for questions about this script

if ! [ -x "$(command -v prettier)" ]; then
	echo 'ERROR: you need to install prettier with "npm install -g prettier"' >&2
	exit 1
fi

prettier --write 'react/src/**/*.js'
prettier --write 'dotnet/src/**/*.jsx'
prettier --write 'dotnet/Sabio.Web.Api/node-api/app/**/*.js'
