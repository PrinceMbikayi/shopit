import express from 'express';

import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { connectDatabase } from './config/dbConnect.js';
import errorMiddleware from './middleware/errors.js';
import cors from 'cors';

// Import all routes
import productRoutes from './routes/products.js'
import authRoutes from './routes/auth.js'
import orderRoutes from './routes/order.js'
import paymentRoutes from './routes/payment.js'

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

app.use(cors());

const corsOptions = {
    origin: 'http://localhost:3000', // Origine spécifique autorisée
    credentials: true, // Autoriser l'envoi de cookies
};

app.use(cors(corsOptions));

// Augmenter le délai d'attente à 2 minutes (120 000 ms)
app.use((req, res, next) => {
    req.setTimeout(120000); // 120 000 ms = 2 minutes
    next();
});


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