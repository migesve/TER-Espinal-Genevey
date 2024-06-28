const express = require('express');
const multer = require('multer');
const path = require('path');
const { Server } = require('socket.io');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
require('dotenv').config();

const authRouter = require('./routers/authRouter');
const setsRouter = require('./routers/setsRouter');
const schema3Router = require('./routers/schema3Router');
const schema4Router = require('./routers/schema4Router');
const inclinaisonRouter = require('./routers/inclinaisonRouter');
const reponsesRouter = require('./routers/reponsesRouter');
const uploadRouter = require('./routers/uploadRouter');

const app = express();


// Configuration de multer pour le stockage des fichiers
/*const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const typeSchema = req.body.typeSchema;
        const uploadPath = typeSchema === '1' ? '../frontend/src/images/schema3' : '../frontend/src/images/schema4';
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        const image_name = `P${req.body.position}I${req.body.inclinaison}A${req.body.angle}.png`;
        cb(null, image_name);
    }
});

const upload = multer({ storage: storage });*/

//Middlewares
app.use(helmet());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true, // to allow cookies   
}
));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.COOKIE_SECRET,
    credentials: true,
    name: "sid",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.ENVIRONMENT === 'production' ? 'true' : 'auto',
        httpOnly: true,
        expires: 1000*60*60*24,
        sameSite: process.env.ENVIRONMENT === 'production' ? 'none' : 'lax'
    }
}));

//Routes
app.use('/auth', authRouter);
app.use('/sets', setsRouter);
app.use('/schema3', schema3Router);
app.use('/schema4', schema4Router);
app.use('/inclinaison', inclinaisonRouter);
app.use('/reponses', reponsesRouter);

app.use('/upload', uploadRouter);

app.get('/', (req, res) => {
    res.send('Hello World');
});

//Socket.io
const server = require('http').createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        credentials: true, // to allow cookies
    }
});
io.on('connection', (socket) => {});

//Démarrer le serveur
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});