@echo off
title Instalador - Hoja de Personaje
echo ========================================
echo   SETUP - HOJA DE PERSONAJE
echo   Cronicas de La Zona
echo ========================================
echo.

:: Verificar si Node.js esta instalado
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [!] Node.js NO esta instalado.
    echo.
    echo Descargando Node.js v20 LTS...
    echo Esto puede tardar unos minutos...
    echo.
    powershell -Command "Invoke-WebRequest -Uri 'https://nodejs.org/dist/v20.11.1/node-v20.11.1-x64.msi' -OutFile '%TEMP%\node_installer.msi'"
    if %errorlevel% neq 0 (
        echo.
        echo ERROR: No se pudo descargar Node.js.
        echo.
        echo Descargalo manualmente desde: https://nodejs.org
        echo Instala la version LTS y luego ejecuta este archivo de nuevo.
        echo.
        pause
        exit /b 1
    )
    echo Instalando Node.js...
    echo Si aparece una ventana de permisos, acepta para continuar.
    echo.
    msiexec /i "%TEMP%\node_installer.msi" /passive /norestart
    if %errorlevel% neq 0 (
        echo Intentando instalacion con interfaz grafica...
        msiexec /i "%TEMP%\node_installer.msi"
    )
    del "%TEMP%\node_installer.msi" >nul 2>nul
    echo.
    :: Actualizar PATH para esta sesion
    set "PATH=%ProgramFiles%\nodejs;%PATH%"
    where node >nul 2>nul
    if %errorlevel% neq 0 (
        echo ========================================
        echo Node.js se instalo correctamente.
        echo CIERRA esta ventana y vuelve a ejecutar
        echo este archivo para continuar.
        echo ========================================
        pause
        exit /b 0
    )
) else (
    echo [OK] Node.js ya esta instalado:
    node --version
)
echo.

:: Ir a la carpeta del proyecto
cd /d "%~dp0"
:: Buscar package.json en la carpeta actual o en la subcarpeta del proyecto
if exist "package.json" (
    echo [OK] Proyecto encontrado en carpeta actual.
) else if exist "Hoja-de-Operativo-Cronicas-de-La-zona\package.json" (
    cd /d "Hoja-de-Operativo-Cronicas-de-La-zona"
    echo [OK] Proyecto encontrado.
) else (
    :: Intentar la ruta completa del repositorio
    if exist "C:\Users\USER\Documents\GitHub\Una-cancion-de-Plomo-y-Hierro\Hoja-de-Operativo-Cronicas-de-La-zona\package.json" (
        cd /d "C:\Users\USER\Documents\GitHub\Una-cancion-de-Plomo-y-Hierro\Hoja-de-Operativo-Cronicas-de-La-zona"
        echo [OK] Proyecto encontrado.
    ) else (
        echo [ERROR] No se encontro el proyecto.
        echo Mueve este archivo a la carpeta del proyecto y ejecutalo de nuevo.
        pause
        exit /b 1
    )
)
echo.

echo [1/2] Instalando librerias necesarias...
echo.
call npm install
if %errorlevel% neq 0 (
    echo.
    echo ERROR al instalar librerias.
    echo Verifica tu conexion a internet e intentalo de nuevo.
    pause
    exit /b 1
)
echo.
echo ========================================
echo [2/2] Iniciando la aplicacion...
echo.
echo POR FAVOR NO CIERRES ESTA VENTANA
echo La app se abrira en tu navegador.
echo ========================================
echo.
call npm run dev
pause
