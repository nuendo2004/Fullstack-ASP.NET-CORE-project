$scriptpath = $MyInvocation.MyCommand.Path
$dir = Split-Path $scriptpath
cd $dir  

Start-Process powershell_ise.exe -WorkingDirectory $dir -Verb runAs 