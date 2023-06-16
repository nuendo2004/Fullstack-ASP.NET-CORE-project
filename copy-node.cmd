if not exist "dotnet\Sabio.Web.Api\node-api" mkdir dotnet\Sabio.Web.Api\node-api
del /f /s /q dotnet\Sabio.Web.Api\node-api\*.* > NUL
if exist "dotnet\Sabio.Web.Api\node-api\sabio_modules" del /f /s /q dotnet\Sabio.Web.Api\node-api\sabio_modules\*.* > NUL
del /f /s /q node\node_modules\*.* > NUL
xcopy /q /e node\*.* dotnet\Sabio.Web.Api\node-api

del /f /s /q dotnet\Sabio.Web.Api\node-api\*.vscode > NUL
del /f /s /q dotnet\Sabio.Web.Api\node-api\*.babelrc > NUL
del /f /s /q dotnet\Sabio.Web.Api\node-api\*.eslintrc.js > NUL

del /f /s /q dotnet\Sabio.Web.Api\node-api\*.config > NUL

if not exist "dotnet\Sabio.Web.Api\node-api\sabio_modules" mkdir dotnet\Sabio.Web.Api\node-api\sabio_modules
xcopy /q /e node\sabio_modules\*.* dotnet\Sabio.Web.Api\node-api\sabio_modules


dir dotnet\Sabio.Web.Api\node-api

dir dotnet\Sabio.Web.Api\node-api\sabio_modules
