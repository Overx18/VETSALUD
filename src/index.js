const dotenv = require('dotenv');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');

// Cargar variables de entorno
dotenv.config();

const app = express();

// Configuración básica
const PORT = process.env.PORT || 3000;
app.set('port', PORT);

// Middlewares
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de CORS
app.use(cors({
    origin: process.env.NODE_ENV === 'production' ? process.env.ALLOWED_ORIGINS : '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

// Views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'view'));
app.use(express.static(path.join(__dirname, 'src', 'view')));

// Public
app.use(express.static(path.join(__dirname, 'public', 'static')));

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', timestamp: new Date() });
});

// Routes
app.use(require('./routes/routes.js'));

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: process.env.NODE_ENV === 'production' ? 
            'Internal Server Error' : 
            err.message
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
});

// Iniciar servidor
app.listen(app.get('port'), () => {
    console.log(`Servidor iniciado en el puerto ${app.get('port')} en modo ${process.env.NODE_ENV || 'development'}`);
});

// Manejo de errores no capturados
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    process.exit(1);
});

process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err);
    process.exit(1);
});