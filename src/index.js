import express from 'express';
import http from 'http';
import socketIO from 'socket.io';
import api from '~/services/api';

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const port = process.env.PORT || 4000;

io.on('connection', function (client) {
    const { token, whisper_room_id, user_id } = client.handshake.query;
    const {sendMessage} = api(token);
    console.log(`New user: ${user_id} with token:${token} in ${whisper_room_id}`);

    client.emit('message', 'Initial message');

    client.join(whisper_room_id);

    client.on('message', function (message) {
        sendMessage({ user_id, message }).then(({data}) => {
            if (data.status) {
                io.to(whisper_room_id).emit('message', data.message);
            } else {
                client.emit('error', data.error_code);
            }
        })
    });
})

server.listen(port, function() {
    console.log(`listening on *:${port}`);
});