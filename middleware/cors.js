const express = require('express');
const app = express();

// Middleware pour ajouter les en-têtes CORS
app.use((req, res, next) => {
    // Permettre l'origine spécifique de votre front-end
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Permettre les méthodes HTTP spécifiques
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

    // Permettre les en-têtes spécifiques
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // Permettre l'envoi de cookies ou d'autres informations d'identification
    res.header('Access-Control-Allow-Credentials', 'true');

    // Si la méthode est OPTIONS, répondre immédiatement avec un statut 200
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Passer au middleware suivant
    next();
});

// Exemple de route
app.post('/api/v1/login', (req, res) => {
    // Logique d'authentification ici
    res.json({ message: 'Login successful' });
});

// Démarrer le serveur
app.listen(3001, () => {
    console.log('Server running on port 3001');
});