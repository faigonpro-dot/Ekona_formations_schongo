#!/bin/bash
echo "Lancement du Kiosque d'Orientation..."

# 1. Verification de Node.js
if ! command -v node &> /dev/null
then
    echo "ERREUR: Node.js n'est pas installe. Veuillez l'installer sur https://nodejs.org"
    exit
fi

echo "2. Installation des dependances..."
npm install --quiet

echo "3. Preparation de l'application..."
npm run build

echo "4. Lancement du serveur..."
npm start &
sleep 5

echo "5. Lancement du navigateur..."
# Tentative d'ouverture avec Chrome ou Firefox en mode kiosque
if command -v google-chrome &> /dev/null
then
    google-chrome --kiosk --fullscreen http://localhost:3000
elif command -v firefox &> /dev/null
then
    firefox --kiosk http://localhost:3000
else
    open http://localhost:3000
fi
