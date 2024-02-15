import fs from 'fs';
import path from 'path';
import { TimoutManager } from './utils.js';

export default function WebSocketManager(wss) {

    wss.on('connection', function connection(ws) {
        const Timout = new TimoutManager(ws);
        Timout.startTimeout();

        ws.on('error', console.error);
    
        ws.on('message', function message(data) {
            console.log('received: %s', data);

        });

        console.log('connected');
        console.log(ws._socket.remoteAddress);
        
        ws.send('something');

        ws.on('close', function close() {
            console.log('disconnected');
        });
    });

}