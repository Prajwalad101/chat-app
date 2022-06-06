import { createContext, useContext } from 'react';
import { io } from 'socket.io-client';
import { SOCKET_URL } from '../config/default';

const socket = io(SOCKET_URL);

const SocketContext = createContext({ socket });

function SocketsProvider({ children }: any) {
  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
}

export const useSockets = () => useContext(SocketContext);

export default SocketsProvider;
