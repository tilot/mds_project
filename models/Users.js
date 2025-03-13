const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Connexion à MySQL

// Définition du modèle User
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone_numbers: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isNumeric: true, // Vérifie que c'est bien un numéro
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  adress: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Assure l'unicité de l'email
    validate: {
      isEmail: true, // Vérifie que l'email est valide
    },
  },
  profil_pictures: {
    type: DataTypes.STRING, // Stocke le chemin de l'image
    allowNull: true,
  },
  birthdates: {
    type: DataTypes.DATEONLY, // Stocke uniquement la date (sans l'heure)
    allowNull: true,
  },
  hobbies: {
    type: DataTypes.TEXT, // Peut stocker une liste d'activités sous forme de texte
    allowNull: true,
  },
  Id_Calendrier: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Calendriers', // Nom de la table référencée
      key: 'Id_Calendrier',
    },
  },
  Id_CSP: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'CSPs', // Nom de la table référencée
      key: 'Id_CSP',
    },
  },
}, {
  timestamps: true, // Ajoute `createdAt` et `updatedAt`
  tableName: 'users', // Nom de la table dans la base de données
});

module.exports = User;
