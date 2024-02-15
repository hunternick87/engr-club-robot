
class WebsocketHandler {
    constructor() {
        this.socket = new WebSocket('ws://127.0.0.1:4010/');
        this.socket.onopen = this.onOpen;
        this.socket.onmessage = this.onMessage;
        this.socket.onclose = this.onClose;
    }

    onOpen = () => {
        console.log('Connected to the server');
    };

    onMessage = (event) => {
        if (event.data == 'PING') {
            this.sendMessage('PONG');
            return;
        }
        console.log('Message received:', event.data);
    };

    onClose = () => {
        console.log('Connection closed');
    };

    sendMessage = (message) => {
        this.socket.send(message);
    };
}

const ws = new WebsocketHandler();
export default ws