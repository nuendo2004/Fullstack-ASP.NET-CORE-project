#Requires -RunAsAdministrator
clear
$scriptpath = $MyInvocation.MyCommand.Path
$dir = Split-Path $scriptpath
$nodePath = $dir + "\node";
$reactPath = $dir + "\react";
$dotnetPath = $dir + "\dotnet";
$themesPath = $dir + "\themes";
$themePath = $dir + "\theme";

cd $dir


Write-Host "Running this script may have unintended consequences." -ForegroundColor Green
$ShouldContinue = Read-Host -Prompt 'Continue? (y) or (n)' 

if($ShouldContinue -ne "y" )
{
    Write-Host "Exiting...." -ForegroundColor Yellow
    exit;
}

Write-host "Running Script out of $dir"

Write-Host "Installing the latest sabio packages ..."
npm install -g sabio@latest



#----------------------------------
# Themes gitignore changes
If( Test-Path $themePath)
{
    Add-Content -Path .\.gitignore -Value "Theme";
    git rm -r --cached Theme/
    git add -A
    git commit -m "Removing themes folder from git"

}

#----------------------------------
# Themes gitignore changes
If( Test-Path $themesPath)
{
    Add-Content -Path .\.gitignore -Value "Themes";
    git rm -r --cached Themes/
    git add -A
    git commit -m "Removing themes folder from git"

}



#----------------------------------
# React

if (Test-Path $reactPath) {
    
    #----------------------------------
    # No one time installs for react
}

#----------------------------------
# Node

if (Test-Path $nodePath) {

	Write-Host "Installing the latest typescript packages ..."
	npm install -g typescript@latest
	npm install -g nodemon@latest
	
    Write-Host "Installing select peer dependencies packages for node project ..."
    Write-Host "( You may get WARN messages. Those are OK. Look for Errors to determine if there is an issue )"
    cd .\node
    #npm install babel-eslint -D --loglevel=error
    
    cd ..\
}
#----------------------------------
# dotnet


if (Test-Path $dotnetPath) {

    #----------------------------------
    # No one time installs for dotnet

}



