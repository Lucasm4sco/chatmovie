import { Router } from "express";

export const getMessageRoutes = (wss) => {
    const messageRoutes = Router();

    // middleware if needed
    messageRoutes.use('/', function (req, res, next) {
        next()
    })

    // getting websocket connection

    wss.on('connection', (ws) => {
        console.log('Nova conexão WebSocket estabelecida');

        // listening to message event (triggered when receiving connection data)
        ws.on('message', (message) => {
            console.log(`Mensagem recebida: ${message}`);
        });

        // send first connection message
        ws.send('Olá, seja bem-vindo!');
    })

    return messageRoutes
}