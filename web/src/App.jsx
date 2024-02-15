import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ws from './modules/websocketHandler.js'

export default function App() {
    const [isWKeyDown, setIsWKeyDown] = useState(false);
    const [isAKeyDown, setIsAKeyDown] = useState(false);
    const [isSKeyDown, setIsSKeyDown] = useState(false);
    const [isDKeyDown, setIsDKeyDown] = useState(false);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'w' && !isWKeyDown) { setIsWKeyDown(true); ws.sendMessage('@command;MOVE_FORWARD;START') }
            if (event.key === 'a' && !isAKeyDown) { setIsAKeyDown(true); ws.sendMessage('@command;MOVE_LEFT;START') }
            if (event.key === 's' && !isSKeyDown) { setIsSKeyDown(true); ws.sendMessage('@command;MOVE_BACK;START') }
            if (event.key === 'd' && !isDKeyDown) { setIsDKeyDown(true); ws.sendMessage('@command;MOVE_RIGHT;START') }
        };

        const handleKeyUp = (event) => {
            if (event.key === 'w') { setIsWKeyDown(false); ws.sendMessage('@command;MOVE_FORWARD;STOP') }
            if (event.key === 'a') { setIsAKeyDown(false); ws.sendMessage('@command;MOVE_LEFT;STOP') }
            if (event.key === 's') { setIsSKeyDown(false); ws.sendMessage('@command;MOVE_BACK;STOP') }
            if (event.key === 'd') { setIsDKeyDown(false); ws.sendMessage('@command;MOVE_RIGHT;STOP') }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [isWKeyDown, isAKeyDown, isSKeyDown, isDKeyDown]);

    function batteryDying() {
        const battery = document.getElementsByClassName('battery');
        for (let i = 0; i < battery.length; i++) {
            setTimeout(() => {
                battery[i].style.backgroundColor = '#963b3bce';
            }, i * 1000);
        }
    }

    return (
        <div>
            <button onClick={batteryDying}>Battery dying</button>
            <div className='videoPlaceholder' />
            <div className='row'>
                <div className='column'>
                    <div className={isWKeyDown ? 'keyPressed' : 'key'}>
                        W
                    </div>
                    <div className='row'>
                        <div className={isAKeyDown ? 'keyPressed' : 'key'}>
                            A
                        </div>
                        <div className={isSKeyDown ? 'keyPressed' : 'key'}>
                            S
                        </div>
                        <div className={isDKeyDown ? 'keyPressed' : 'key'}>
                            D
                        </div>
                    </div>
                </div>
                <div className='batteryContainer'>
                    <div className='battery' />
                    <div className='battery' />
                    <div className='battery' />
                    <div className='battery' />
                </div>
            </div>
        </div>
    )
}
