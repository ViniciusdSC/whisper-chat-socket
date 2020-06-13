import axios from 'axios';

export default function (token) {
    const instance = axios.create({
        baseURL: process.env.BASE_API,
        timeout: 5000,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    async function sendMessage ({ user_id, message }) {
        return {
            data: {
                status: true,
                message: {
                    user_id,
                    message
                }
            }
        }
        // return instance.post(`message/${user_id}`, {
        //     message
        // });
    }

    return {
        sendMessage
    };
}