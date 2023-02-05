// server.js
//import { create, router as _router, defaults, rewriter } from 'json-server';
import jsonServer from 'json-server';
const { create, router: _router, defaults, rewriter } = jsonServer;
import { Server } from "socket.io";
const server = create()
const router = _router('db.json')
const middlewares = defaults()

const PORT = process.env.PORT || 3000

server.use(middlewares)
// Add custom routes before JSON Server router
server.get('/echo', (req, res) => {
  res.jsonp(req.query)
})

  


// Add this before server.use(router)
server.use(rewriter({
  '/api/*': '/$1',
  '/blog/:resource/:id/show': '/:resource/:id',
  '/socket.io/*': '/admin'
}))


// In this example we simulate a server side error response
router.render = (req, res) => {
  res.status(500).jsonp({
    error: "error message here",
    message: req.error
  })
}
server.use(router)
const http = server.listen(PORT, () => {
  console.log('JSON Server is running')
})

const io = new Server(http, {
  cors: {
  origin: "*",
  methods: ["GET", "POST"],
  }
  })
//io.of('/admin')
const ioAdmin = io.of('/chat-service');
ioAdmin.on('connection', socket => {
  console.log(`User Connected: ${socket.id}`);
  socket.emit('message', 'Welcome to ChatApp')
  socket.on('send message', msg => {
    console.log('send message', msg)
    ioAdmin.emit('chat message', msg);
  });
  socket.on("disconnect", () => {
    const lastToDisconnect = ioAdmin.sockets.size === 0;
    if (lastToDisconnect) {
      //gc();
      console.log('lastToDisconnect')
    }
  });
})