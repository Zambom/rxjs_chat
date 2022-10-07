const server = require('./server');
const { connection$, disconnect$, listenOnConnect } = require('./connection');

const rooms = [{
    name: 'Lobby',
    participants: 0
}];

server.listen(3000, () => {
    console.log('server up');
});

connection$.subscribe(({ client }) => {
    console.log('new user approaches: ', client.id);
});

disconnect$.subscribe(client => {
    console.log('farewel: ', client.id);
});

listenOnConnect('introduction').subscribe(({ io, client, data }) => {
    const allSockets = io.sockets.sockets;
    const { id } = client;

    allSockets.get(id).username = data;

    client.join(rooms[0].name);
    client.to(rooms[0].name).emit('new user', { id, data });

    rooms[0].participants = io.sockets.adapter.rooms.get(rooms[0].name).size;

    io.to(client.id).emit('rooms list', { rooms });
});

listenOnConnect('new message').subscribe(({ io, client, data }) => {
    const allSockets = io.sockets.sockets;
    const { id } = client;

    client.to(rooms[0].name).emit('incoming message', { username: allSockets.get(id).username, message: data });
})