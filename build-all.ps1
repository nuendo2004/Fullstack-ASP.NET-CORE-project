#Requires -RunAsAdministrator
clear
$scriptpath = $MyInvocation.MyCommand.Path
$dir = Split-Path $scriptpath
$nodePath = $dir + "\node";
$reactPath = $dir + "\react";
$dotnetPath = $dir + "\dotnet";
$iTestPath = $dir + "\integration-tests";

cd $dir
Write-host "Running Script out of $dir"


#----------------------------------
# React

if (Test-Path $reactPath) {
    
    $pathToDevEnv = $reactPath + "\.env.development"
    $pathToEnv = $reactPath + "\.env"


    Write-Host "Installing packages for react ...  `n"
    Write-Host "Warnings may show in red. Those messages are OK. Look for actual 'Error' messages" -ForegroundColor Green
    
    cd .\react
    yarn install
    Write-Host "Install complete"

    if( !(Test-Path -Path ($pathToDevEnv)) )
    {
        Write-Host "Copying .env for development"

        # Copies the .env to the .env.development file for local development
        Copy-Item  $pathToEnv -Destination $pathToDevEnv
        
        Write-Host "New .env.development file create `n"  -ForegroundColor Green
    }
    else
    {
        Write-Host "A .env.development was already found. Skipping setup. `n"  -ForegroundColor Green
    }


    Write-Host "Building react..."
    yarn build
    Write-Host "`nReact Build A-OK. 👌 `n"  -ForegroundColor Green

    cd ..\
}

#----------------------------------
# Node

if (Test-Path $nodePath) {

    cd $nodePath
    Write-Host "Installing all npm packages for node project ..."
    Write-Host "Warnings may show in red. Those messages are OK. Look for actual 'Error' messages" -ForegroundColor Green
    npm install --loglevel=error

    Write-Host "Install complete`n"

    Write-Host "Compiling App... (This will pause for 10 seconds) 🔨"

    $command = "npm "
    $args = " run babel-app --loglevel=error "

    Start-Process $command $args -PassThru -WindowStyle Normal 

    Start-Sleep -s 10
    Write-Host "`nChecking server integrity for node api ..."

    npm run spinup-die

    Write-Host "`nNode Server OK 👌 `n"  -ForegroundColor Green
    
    cd ..\
}
#----------------------------------
# dotnet


if (Test-Path $dotnetPath) {

    & ($dir + "\build-net.ps1")

}

if (Test-Path $iTestPath) {

    cd $iTestPath
    Write-Host "`nInstalling all npm packages for integrations tests ..."
    Write-Host "Warnings may show in red. Those messages are OK. Look for actual 'Error' messages" -ForegroundColor Green
    npm install --loglevel=error

    Write-Host "Install complete`n"

    Write-Host "`nIntegration Tests - OK 👌 `n"  -ForegroundColor Green
    
    cd ..\

}


