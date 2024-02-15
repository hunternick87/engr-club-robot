
export class TimoutManager {
    constructor(ws, inputTime) {
        this.intervalObj = {};
        this.time = inputTime || (60000 * 5); // 5 minutes
        this.websocket = ws;
        this.cleared = false;

    }

    startTimeout() {
        this.intervalObj = setInterval(() => {
            this.websocket.send('PING');
            this.callbackWait();
        }, this.time);
    }

    clearTimeout() {
        clearInterval(this.intervalObj);
    }

    restartTimeout() {
        this.clearTimeout();
        this.startTimeout();
    }

    callbackWait() {
        this.websocket.on('message', (data) => {
            if (data == 'PONG') {
                this.cleared = true;
            }
        });
    
        setTimeout(() => {
            if (this.cleared === false) {
                this.websocket.send('Terminating connection due to inactivity.');
                this.websocket.terminate();
                this.clearTimeout();
            } else {
                this.cleared = false;
            }
        }, 5000);
    }
  
}


// Command structure
// :action
// @command;MOVE_FORWARD;START
export function commandParser(command) {
    if (command.startsWith(':')) {
        // System action
        return command;
    } else if (command.startsWith('@')) {
        // Command
        command = command.split(';');
        return {
            type: command[1],
            action: command[2]
        };
    } else {
        return null;
    }
}