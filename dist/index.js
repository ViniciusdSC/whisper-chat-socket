'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

var _api = require('./services/api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express2.default)();
const server = _http2.default.createServer(app);
const io = (0, _socket2.default)(server);
const port = process.env.PORT || 4000;

io.on('connection', function (client) {
    const { token, whisper_room_id, user_id } = client.handshake.query;
    const { sendMessage } = (0, _api2.default)(token);

    client.join(whisper_room_id);

    client.on('message', function (message) {
        sendMessage({ user_id, message }).then(({ data }) => {
            if (data.status) {
                io.to(whisper_room_id).emit('message', data.message);
            } else {
                client.emit('error', data.error_code);
            }
        });
    });
});

server.listen(port, function () {
    console.log(`listening on *:${port}`);
});
//# sourceMappingURL=index.js.map