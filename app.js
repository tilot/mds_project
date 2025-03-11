// 📌 Import des modules nécessaires
const express = require('express'); // Framework Express pour créer des routes API
const { Sequelize, DataTypes } = require('sequelize'); // ORM Sequelize pour interagir avec MySQL

// 📌 Création de l'application Express
const app = express();

// 📌 Middleware pour parser les requêtes en JSON (⚠️ Manquant dans ton code)
app.use(express.json()); // IMPORTANT pour pouvoir lire req.body

// 📌 Middleware de test pour toute requête (⚠️ Ce middleware doit être APRES express.json())
app.use((req, res, next) => {
    console.log(`➡️ Requête reçue : ${req.method} ${req.url}`);
    next(); // Permet de passer à la suite du traitement
});

// 📌 Connexion à la base de données MySQL
const sequelize = new Sequelize('projet_MDS', 'root', 'root', {
    host: 'localhost',   // Serveur de la base de données
    dialect: 'mysql',    // On précise qu'on utilise MySQL
    port: 3306           // Port par défaut de MySQL
});

// 📌 Vérifier si la connexion est OK
sequelize.authenticate()
    .then(() => console.log('✅ Connexion à MySQL réussie !'))
    .catch(err => console.error('❌ Erreur de connexion à MySQL :', err));

// 📌 Définition du modèle User
const User = sequelize.define('User', {
    nom: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false }
});

// 📌 Synchronisation avec la base de données (⚠️ À utiliser avec précaution en prod)
sequelize.sync()
    .then(() => console.log('📌 Base de données synchronisée'))
    .catch(err => console.error('❌ Erreur de synchronisation de la base :', err));

// 📌 Route pour ajouter un utilisateur
app.post('/users', async (req, res) => {
    try {
        console.log('➡️ Données reçues pour création d\'utilisateur :', req.body); // Debug
        const user = await User.create(req.body); // Sequelize crée un nouvel utilisateur
        res.status(201).json(user); // On renvoie l'utilisateur créé en JSON
    } catch (error) {
        console.error('❌ Erreur lors de la création de l\'utilisateur :', error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// 📌 Route GET pour récupérer tous les utilisateurs (ajout bonus)
app.get('/users', async (req, res) => {
    try {
        const users = await User.findAll(); // Récupère tous les utilisateurs
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// 📌 Exportation correcte de l'application Express ET de Sequelize
module.exports = { app, sequelize };
