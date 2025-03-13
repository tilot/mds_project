const http = require('http');
const PORT = process.env.PORT || 3002; // Utilisation correcte de process.env
require('dotenv').config(); // ✅ Chargement des variables d'environnement
const { app } = require('./app'); // Extraction correcte de `app`
const server = http.createServer(app); // ✅ Crée d'abord `server`

// 📌 Écoute du serveur sur le port défini
server.listen(PORT, () => console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`));


                    