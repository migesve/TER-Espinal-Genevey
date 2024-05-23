const express = require('express');
const { Server } = require('socket.io');
const app = express();
const helmet = require('helmet');
const cors = require('cors');
const authRouter = require('./routers/authRouter');
const setsRouter = require('./routers/setsRouter');
const schema3Router = require('./routers/schema3Router');
const schema4Router = require('./routers/schema4Router');
const inclinaisonRouter = require('./routers/inclinaisonRouter');
const session = require('express-session');
require('dotenv').config();

const server = require('http').createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        credentials: true, // to allow cookies
    }
});

app.use(helmet());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true, // to allow cookies   
}
));
app.use(express.json());
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
app.use('/auth', authRouter);
app.use('/sets', setsRouter);
app.use('/schema3', schema3Router);
app.use('/schema4', schema4Router);
app.use('/inclinaison', inclinaisonRouter);
app.get('/', (req, res) => {
    res.send('Hello World');
});

io.on('connection', (socket) => {});

server.listen(4000, () => {
    console.log('Server is running on port 4000');
});