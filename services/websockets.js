const WebSocket = require('ws')

// create a new websocket server at port 8080
const wss = new WebSocket.Server({ port: 8080 });

// when a connection is established,
// handles the room joining
// calls the function to send the message to all clients in the same room
wss.on('connection', ws => {
    ws.room = 'general';
    ws.on('message', message => {
        let msg = JSON.parse(message);
        if (msg.joinRoom) {ws.room = msg.joinRoom}
        if (msg.room) {websocketSendToAll(JSON.stringify(msg))}
    });
    ws.send(JSON.stringify({message: 'Joined the chat!'}));
});

// function to send a message to all clients in the same room
function websocketSendToAll (text) {
    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            if (client.room === JSON.parse(text).room) {
                client.send(text);
            }
        }
    });
}