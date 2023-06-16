Import-Module WebAdministration

$site = Get-Website -Name "SabioBootcamp"

if (!$site) {
    
    Write-Host "Configuring your IIS Site for your dotnet site....."
    New-WebAppPool -name "SabioBootcamp" -force
    
    $pool = Get-Item IIS:\AppPools\SabioBootcamp
    $pool.ManagedRuntimeVersion = "v4.0"
    $pool | Set-Item 

    $ScriptDir = Split-Path $script:MyInvocation.MyCommand.Path
    New-Website -name "SabioBootcamp" -Port 3100 -PhysicalPath "$ScriptDir\dotnet\Sabio.Web.Api\" -ApplicationPool "SabioBootcamp" -HostHeader "sabio.localhost" -Force

    Write-Host "IIS Site Configured.`n"

}

Write-Host "Writing to host file for http://sabio.localhost:3100 `n"

If ((Get-Content "$($env:windir)\system32\Drivers\etc\hosts" ) -notcontains "127.0.0.1 sabio.localhost")   
 {ac -Encoding UTF8  "$($env:windir)\system32\Drivers\etc\hosts" "127.0.0.1 sabio.localhost" }


Write-Host "Local Web Server Up now at http://sabio.localhost:3100 🌐"