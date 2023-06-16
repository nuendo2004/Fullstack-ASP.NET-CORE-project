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


#----------------------------------
# Themes gitignore changes
If( Test-Path $themePath)
{
    Add-Content -Path .\.gitignore -Value "Theme";
    git rm -r --cached Theme/
    git add -A
    git commit -m "Removing themes folder from git" --no-verify

}

#----------------------------------
# Themes gitignore changes
If( Test-Path $themesPath)
{
    Add-Content -Path .\.gitignore -Value "Themes";
    git rm -r --cached Themes/
    git add -A
    git commit -m "Removing themes folder from git" --no-verify

}






