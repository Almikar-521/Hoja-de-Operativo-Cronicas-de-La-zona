@echo off
echo ========================================
echo   INICIANDO HOJA DE PERSONAJE
echo ========================================
echo.
echo [1/2] Verificando e instalando librerias necesarias...
call npm install
echo.
echo [2/2] Abriendo la aplicacion...
echo.
echo POR FAVOR NO CIERRES ESTA VENTANA NEGRA
echo.
call npm run dev
pause
