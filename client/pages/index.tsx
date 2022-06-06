import { useState } from 'react';
import { useSockets } from '../context/socket.context';

export default function Home() {
  const [socketId, setSocketId] = useState<string>();
  const { socket } = useSockets();

  socket.on('connect', () => {
    setSocketId(socket.id);
  });

  return <div>{socketId}</div>;
}
