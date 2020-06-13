'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (token) {
    const instance = _axios2.default.create({
        baseURL: process.env.BASE_API,
        timeout: 5000,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    async function sendMessage({ user_id, message }) {
        return {
            status: true,
            message: {
                user_id,
                message
            }
            // return instance.post(`message/${user_id}`, {
            //     message
            // });
        };
    }

    return {
        sendMessage
    };
};

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=api.js.map