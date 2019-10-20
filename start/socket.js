
const Server = use('Server')
const io = use('socket.io')(Server.getInstance())

io.on('connection', function (socket) {
  console.log('hola mundo')
})