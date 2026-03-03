@echo off
echo Lancement du Kiosque d'Orientation...
echo.
echo 1. Verification de Node.js...
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo ERREUR: Node.js n'est pas installe. Veuillez l'installer sur https://nodejs.org
    pause
    exit /b
)

echo 2. Installation des dependances (si necessaire)...
call npm install --quiet

echo 3. Preparation de l'application...
call npm run build

echo 4. Lancement du serveur et de l'affichage...
start /min npm start
timeout /t 5
echo Lancement du navigateur en mode plein ecran...
start chrome --kiosk --fullscreen http://localhost:3000
echo.
echo Kiosque pret ! (Appuyez sur Alt+F4 pour fermer le navigateur)
pause
