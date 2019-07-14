const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);   //divide servidor para trabalhar com protocolo http e protocolo web socket para comunicação em tempo real

mongoose.connect(
    'mongodb+srv://cloneinsta:12345@cluster0-yacpf.mongodb.net/test?retryWrites=true&w=majority',
    { useNewUrlParser: true }
);

//criação de midleway para deixar variável io disponível em toda aplicação
//next permite que midleway atual seja executado e os demais
app.use((req, res, next) => {
    req.io = io;

    next();
});
app.use(cors());
app.use('/api/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));
app.use(require('./routes'));

server.listen(3001);