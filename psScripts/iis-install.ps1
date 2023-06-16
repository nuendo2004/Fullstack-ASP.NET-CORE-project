
<#

    Script to install most of the IIS features we need

	Taken from here:
	https://weblog.west-wind.com/posts/2017/May/25/Automating-IIS-Feature-Installation-with-Powershell

#>

Enable-WindowsOptionalFeature -Online -FeatureName NetFx4Extended-ASPNET45,IIS-NetFxExtensibility45,WAS-WindowsActivationService,IIS-WebServerRole,IIS-WebServer,IIS-CommonHttpFeatures,IIS-HttpErrors,IIS-ApplicationDevelopment,IIS-NetFxExtensibility45,IIS-HealthAndDiagnostics,IIS-LoggingLibraries,IIS-HttpTracing,IIS-Security,IIS-RequestFiltering,IIS-Performance,IIS-WebServerManagementTools,IIS-StaticContent,IIS-DefaultDocument,IIS-DirectoryBrowsing,IIS-WebSockets,IIS-HttpCompressionStatic,IIS-ManagementConsole,IIS-ApplicationInit,IIS-ISAPIExtensions,IIS-ISAPIFilter,IIS-ASPNET45
