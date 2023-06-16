clear
$scriptpath = $MyInvocation.MyCommand.Path
$dir = Split-Path $scriptpath
$nodePath = $dir + "\node";
$reactPath = $dir + "\react";
$dotnetPath = $dir + "\dotnet";

cd $dir
.\build-all.ps1
.\copy-client.cmd
.\copy-node.cmd


$nodeMods = $dotnetPath + "\Sabio.Web.Api\node-api\node_modules\"
Write-host $nodeMods

do {
  $dirs = gci $nodeMods -directory -recurse | Where { (gci $_.fullName).count -eq 0 } | select -expandproperty FullName
  $dirs | Foreach-Object { Remove-Item $_ }
} while ($dirs.count -gt 0)



