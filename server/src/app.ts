import config from 'config';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import socket from './socket';
import logger from './utils/logger';

const port = config.get<number>('port');
const host = config.get<string>('host');
const corsOrigin = config.get<string>('corsOrigin');

const app = express();

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: corsOrigin,
    credentials: true,
  },
});

app.get('/', (_, res) => res.send(`Server is up`));

httpServer.listen(port, host, () => {
  logger.info('Server is listening');

  socket({ io });
});
