import express from 'express';

import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDatabase } from './config/dbConnect.js';
import errorMiddleware from './middleware/errors.js';

// Import all routes
import authRoutes from './routes/auth.js';
import orderRoutes from './routes/order.js';
import paymentRoutes from './routes/payment.js';
import productRoutes from './routes/products.js';

const app = express();

// Handle Unaught exceptions
process.on('uncaughtException', (err) => {
    console.log(`ERROR: ${err}`);
    console.log('Shutting down due to uncaught exception');
    process.exit(1);
});

dotenv.config();

// Connecting to the database
connectDatabase();

app.use((req, res, next) => {
    res.setHeader('Referrer-Policy', 'no-referrer-when-downgrade'); // ou 'origin', 'no-referrer', etc.
    next();
});

// Définir les options CORS
const allowedOrigins = ['http://localhost:3000', 'https://ritzglobal.net'];
const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow sending cookies
    allowedHeaders: ['Content-Type', 'Authorization'],
};


// Utiliser CORS avec les options définies
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Autoriser les requêtes préflight pour toutes les routes

//app.use(cors());

// Définir des routes
app.get('/', (req, res) => {
    res.send('Hello World!');
  });

  // Démarrer le serveur
// const port = process.env.PORT || 4000;
// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });

// app.use(cors({
//     origin: 'http://localhost:3000', // Origine spécifique autorisée
//     credentials: true, // Autoriser l'envoi de cookies
// }));

// app.use(cors(corsOptions));

// Configurer les autres middlewares
app.use(express.json({ 
    limit: "10mb",
    verify: (req, res, buf) => {
        req.rawBody = buf.toString();
    },
}));
app.use(cookieParser());

app.use("/api/v1", productRoutes);
app.use("/api/v1", authRoutes);
app.use("/api/v1", orderRoutes);
app.use("/api/v1", paymentRoutes);
app.get("/", (req, res) => res.send("Express on Vercel"));

// Using error middleware
app.use(errorMiddleware);

const server = app.listen(process.env.PORT, () => {
    console.log(`Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`);
});

//Handle inhandled Promise rejection
process.on('unhandledRejection', (err) => {
    console.log(`ERROR: ${err}`);
    console.log('Shutting down server due to Unhandled Promise Rejection');
    server.close(() => {
        process.exit(1);
    });
});