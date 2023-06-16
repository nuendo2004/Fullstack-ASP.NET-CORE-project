#Requires -RunAsAdministrator
clear

& ((Split-Path $MyInvocation.InvocationName) + "\build-all.ps1")

& ((Split-Path $MyInvocation.InvocationName) + "\run-dev-sites.ps1")