#Requires -RunAsAdministrator
Write-Host "Installing Yarn..." -ForegroundColor Cyan

Write-Host "Downloading..."
$msiPath = "$env:TEMP\yarn.msi"

[Net.ServicePointManager]::SecurityProtocol = [System.Net.SecurityProtocolType]::Tls12
(New-Object Net.WebClient).DownloadFile('https://yarnpkg.com/latest.msi', $msiPath)

Write-Host "Installing..."
cmd /c start /wait msiexec /i "$msiPath" /quiet

Write-Host "Yarn installed" -ForegroundColor Green