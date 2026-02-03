@echo off
echo ========================================
echo      MEME MUSEUM - Servidor Local
echo ========================================
echo.
echo Iniciando servidor em http://localhost:8080
echo.
echo Abra seu navegador e acesse:
echo http://localhost:8080
echo.
echo Pressione Ctrl+C para fechar o servidor
echo ========================================
echo.

REM Tenta usar Python primeiro
python --version >nul 2>&1
if %errorlevel% equ 0 (
    echo Usando Python...
    python -m http.server 8080
    goto :end
)

REM Se Python não funcionar, tenta py (Windows Python Launcher)
py --version >nul 2>&1
if %errorlevel% equ 0 (
    echo Usando Python...
    py -m http.server 8080
    goto :end
)

REM Se nenhum dos dois funcionar, mostra mensagem de erro
echo ERRO: Python nao encontrado!
echo.
echo Por favor, instale Python em:
echo https://www.python.org/downloads/
echo.
echo Ou use npx (requer Node.js):
echo npx http-server -p 8080
echo.
pause

:end
