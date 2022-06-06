import { Server } from 'socket.io';
import logger from './utils/logger';

const EVENTS = {
  connection: 'connection',
  CLIENT: {
    CREATE_ROOM: 'CREATE_ROOM',
  },
};

function socket({ io }: { io: Server }) {
  logger.info('Sockets enabled');

  io.on(EVENTS.connection, (socket) => {
    logger.info(`User connected ${socket.id}`);

    socket.on(
      EVENTS.CLIENT.CREATE_ROOM,
      ({ roomName }: { roomName: string }) => {
        console.log({ roomName });
      }
    );
  });
}

export default socket;
