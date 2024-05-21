const express = require('express');
const { Server } = require('socket.io');
const app = express();
const helmet = require('helmet');
const cors = require('cors');
const authRouter = require('./routers/authRouter');

const server = require('http').createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        credentials: true, // to allow cookies
    }
});

app.use(helmet());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true, // to allow cookies   
}
));
app.use(express.json());

app.use('/auth', authRouter);
app.get('/', (req, res) => {
    res.send('Hello World');
});

io.on('connection', (socket) => {});

server.listen(4000, () => {
    console.log('Server is running on port 4000');
});