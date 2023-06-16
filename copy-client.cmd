if not exist "dotnet\Sabio.Web.Api\ClientApp\build" mkdir dotnet\Sabio.Web.Api\ClientApp\build
del /f /s /q dotnet\Sabio.Web.Api\ClientApp\build\*.* > NUL
xcopy /q /e react\build\*.* dotnet\Sabio.Web.Api\ClientApp\build
dir dotnet\Sabio.Web.Api\ClientApp\build