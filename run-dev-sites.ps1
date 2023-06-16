#clear
$scriptpath = $MyInvocation.MyCommand.Path
$dir = Split-Path $scriptpath
$nodePath = $dir + "\node";
$reactPath = $dir + "\react";
$dotnetPath = $dir + "\dotnet";
$dotNetProcess

Write-Host "Starting all servers 🏃‍"

if (Test-Path $dotnetPath) {

    Write-Host "Starting dotnet...... "
    $webApi = $dotnetPath + "\sabio.web.api";
    $command = "dotnet "
    $args = " run --launch-profile Debug "

    $dotNetProcess = Start-Process $command $args -WorkingDirectory $webApi -PassThru -WindowStyle Normal 
    #dotnet run -p $webApi

}



if (Test-Path $nodePath) {
    
    Write-Host "Starting node...... "


    $command = "npm "
    $args = " run start"
    
    cd $nodePath 
    Start-Process  $command $args -PassThru -WindowStyle Normal 

    cd ..
}


if (Test-Path $reactPath) {
    
    Write-Host "Starting react...... "
    $command = "yarn "
    $args = " start"
    
    cd $reactPath
    Start-Process $command $args -PassThru -WindowStyle Normal 

}

Write-Host "Waiting for all to launch .... ⏳"
Start-Sleep -s 4

$procid = (Get-WmiObject win32_process | where {$_.ProcessName -eq ‘Powershell.exe’} | select processid)
Get-WmiObject win32_process | where {$_.ParentProcessId -eq $id}
