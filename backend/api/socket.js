// Minimal Socket.IO handler for serverless (limited functionality)
import { Server } from 'socket.io';
import { createServer } from 'http';

export default function handler(req, res) {
  if (res.socket.server.io) {
    console.log('Socket is already running');
  } else {
    const httpServer = createServer();
    const io = new Server(httpServer);
    
    io.on('connection', (socket) => {
      // Your Socket.IO logic here (very limited lifespan)
      socket.on('codeChange', ({ roomId, code }) => {
        socket.to(roomId).emit('codeUpdate', code);
      });
    });
    
    res.socket.server.io = io;
    httpServer.on('request', (req, res) => {
      res.writeHead(404);
      res.end();
    });
  }
  res.end();
}
