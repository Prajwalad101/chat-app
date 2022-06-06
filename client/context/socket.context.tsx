import { createContext, useContext, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { SOCKET_URL } from '../config/default';
import EVENTS from '../config/events';

type Message = {
  message: string;
  username: string;
  time: string;
};

interface Context {
  socket: Socket;
  username?: string;
  setUsername: Function;
  messages: Message[];
  setMessages: Function;
  roomId?: string;
  rooms: Record<string, { name: string }>;
}

const socket = io(SOCKET_URL);

const SocketContext = createContext<Context>({
  socket,
  setUsername: () => false,
  setMessages: () => false,
  rooms: {},
  messages: [],
});

function SocketsProvider(props: any) {
  const [username, setUsername] = useState('');
  const [roomId, setRoomId] = useState('');
  const [rooms, setRooms] = useState({});
  const [messages, setMessages] = useState<Message[]>([]);

  socket.on(EVENTS.SERVER.ROOMS, (value) => {
    setRooms(value);
  });

  socket.on(EVENTS.SERVER.JOINED_ROOM, (value) => {
    setRoomId(value);
    setMessages([]);
  });

  socket.on(
    EVENTS.SERVER.ROOM_MESSAGE,
    ({ message, username, time }: Message) => {
      setMessages([...messages, { message, username, time }]);
    }
  );

  return (
    <SocketContext.Provider
      value={{
        socket,
        username,
        setUsername,
        rooms,
        roomId,
        messages,
        setMessages,
      }}
      {...props}
    />
  );
}

export const useSockets = () => useContext(SocketContext);

export default SocketsProvider;
