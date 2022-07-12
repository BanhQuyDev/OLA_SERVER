const express = require("express");
const dotenv = require("dotenv");
const { rootRouter } = require("./routers/root.router");
const { updateMemberShipWithUrl } = require("./controllers/student.controller");
dotenv.config({ path: 'server/.env' });
const cors = require('cors');
const app = express();
const path = require("path");
const http = require('http').createServer(app);
app.use(express.json());
// setup stati file
// app.use(express.static("public"))
const pathPublicDirectory = path.join(__dirname, "./public");
const corsOptions = {
  origin: '*',
  // credentials:true,            //access-control-allow-credentials:true
  // optionSuccessStatus:200,
}
app.use(cors(corsOptions));
app.use("/public", express.static(pathPublicDirectory))
//http://localhost:7000/api/v1
app.use("/api/v1", rootRouter);
app.get('/order/success', async (req, res) => {
  const { idStudent, memberShip, classInWeek, validMembership } = req.query;
  const result = await updateMemberShipWithUrl(idStudent, memberShip, classInWeek, validMembership)
  if (result === "Update Successfully!!") {
    res.send(`<html><body><h1>Your payment is completed, please refresh your OLA account !</h1></body></html>`);
  } else {
    res.send(`<html><body><h1>Something wrong happened, please contact an OLA admin for this incident.</h1></body></html>`);
  }
});

app.get('/order/cancel', async (req, res) => {
  // const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
  // const customer = await stripe.customers.retrieve(session.customer);
  res.send(`<html><body><h1>Your payment is cancelled !</h1></body></html>`);
});

const port = process.env.PORT || 6000;


const io = require('socket.io')(http);
let socketList = {};


// Socket
io.on('connection', (socket) => {
  console.log(`New User connected: ${socket.id}`);

  socket.on('test', ({ test }) => {
    console.log(test);
  });

  socket.on('disconnect', () => {
    socket.disconnect();
    console.log('User disconnected!');
  });

  // socket.on('BE-check-user', ({ roomId, userName }) => {
  //   let error = false;

  //   io.sockets.in(roomId).clients((err, clients) => {
  //     clients.forEach((client) => {
  //       if (socketList[client] == userName) {
  //         error = true;
  //       }
  //     });
  //     socket.emit('FE-error-user-exist', { error });
  //   });
  // });

  /**
   * Join Room
   */
  socket.on('BE-join-room', ({ roomId, userName }) => {
    // Socket Join RoomName
    socket.join(roomId);
    socketList[socket.id] = { userName, video: true, audio: true };

    // Set User List
    io.sockets.in(roomId).clients((err, clients) => {
      try {
        const users = [];
        clients.forEach((client) => {
          // Add User List
          users.push({ userId: client, info: socketList[client] });
        });
        socket.broadcast.to(roomId).emit('FE-user-join', users);
        // io.sockets.in(roomId).emit('FE-user-join', users);
      } catch (e) {
        io.sockets.in(roomId).emit('FE-error-user-exist', { err: true });
      }
    });
  });

  socket.on('BE-call-user', ({ userToCall, from, signal }) => {
    io.to(userToCall).emit('FE-receive-call', {
      signal,
      from,
      info: socketList[socket.id],
    });
  });

  socket.on('BE-accept-call', ({ signal, to }) => {
    io.to(to).emit('FE-call-accepted', {
      signal,
      answerId: socket.id,
    });
  });

  socket.on('BE-send-message', ({ roomId, msg, sender }) => {
    io.sockets.in(roomId).emit('FE-receive-message', { msg, sender });
  });

  socket.on('BE-leave-room', ({ roomId, leaver }) => {
    // socket.emit('testEmit', 'hey')
    delete socketList[socket.id];
    socket.broadcast
      .to(roomId)
      .emit('FE-user-leave', { userId: socket.id, userName: [socket.id] });
    //   io.sockets.clients(roomId).forEach(function(s){
    //     console.log(s)
    // });
    // if(io.sockets.sockets[socket.id]){
    //   io.sockets.sockets[socket.id].leave(roomId);
    // }

  });

  socket.on('BE-toggle-camera-audio', ({ roomId, switchTarget }) => {
    if (switchTarget === 'video') {
      socketList[socket.id].video = !socketList[socket.id].video;
    } else {
      socketList[socket.id].audio = !socketList[socket.id].audio;
    }
    socket.broadcast
      .to(roomId)
      .emit('FE-toggle-camera', { userId: socket.id, switchTarget });
  });
});

http.listen(port, () => {
  console.log("app run on port: " + port);
});