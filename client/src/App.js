import { useEffect } from 'react';
import { io } from 'socket.io-client';

export default function App() {
  const socket = io('http://localhost:8000');

  useEffect(() => {
    socket.on('connect', () => {
      console.log(socket.id);
    });
  });

  const emit = () => {
    socket.emit('click', () => {
      console.log('click emit');
    });
  };

  return (
    <div>
      User <button onClick={emit}>Click</button>
    </div>
  );
}
