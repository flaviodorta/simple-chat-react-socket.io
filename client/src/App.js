import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useSocketIo } from './hooks/useSocketIo';

export default function App() {
  const [socket, setSocket] = useState();

  useEffect(() => {
    const RECONNECT_DELAY = 5000;
    setSocket(io('http://localhost:8000'));
    socket.on('connect', () => {
      console.log(socket.id);
    });
    socket.on('connect_error', () => {
      setTimeout(() => socket.connect(), RECONNECT_DELAY);
    });
  }, []);

  const [inputValue, setInputValue] = useState('');

  socket.on('chat message', (msg) => {
    console.log(msg);
  });

  const emit = () => {
    console.log(inputValue);
    if (inputValue) {
      socket.emit('chat message', inputValue);
    }
  };

  return (
    <div>
      <input type='text' onChange={(e) => setInputValue(e.target.value)} />
      User <button onClick={emit}>Click</button>
    </div>
  );
}
