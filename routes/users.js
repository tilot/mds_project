const express = require('express');
const User = require('./models/User');

const app = express();
app.use(express.json());

// Route pour ajouter un utilisateur
app.post('/users', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route pour récupérer tous les utilisateurs
app.get('/users', async (req, res) => {
  console.log("coucou")  // try {
  //   const users = await User.findAll({
  //     attributes: [
  //       ['id', 'Id_User'], 
  //       ['nom', 'name'], 
  //       'firstname',
  //       'phone_numbers',
  //       'password',
  //       'adress',
  //       ['email', 'mail'],  
  //       'profil_pictures',
  //       'birthdates',
  //       'hobbies',
  //       'Id_Calendrier',
  //       'Id_CSP',
  //       'createdAt',
  //       'updatedAt'
  //     ]
  //   });
    res.status(200).json(users); // Renvoie les utilisateurs sous format JSON
  } catch (error) {
    console.error("❌ Erreur SQL :", error); // Affiche l'erreur complète dans le terminal
    res.status(500).json({ error: error.message });
  }
});

// Lancer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`));
