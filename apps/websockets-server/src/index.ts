import { WebSocketServer, WebSocket } from 'ws';

const wss = new WebSocketServer({ port: 4001 });

type RoomMap = Map<string, Set<WebSocket>>;
const rooms: RoomMap = new Map();
const clients = new Map<WebSocket, { username: string, room: string | null }>();

const sendTo = (socket: WebSocket, type: string, payload: object) => {
    socket.send(JSON.stringify({ type, payload }));
};

const broadcastToRoom = (room: string, type: string, payload: object, excludeSocket?: WebSocket) => {
    const sockets = rooms.get(room);
    if (!sockets) return;
    sockets.forEach((client) => {
        if (client !== excludeSocket) {
            sendTo(client, type, payload);
        }
    });
};

wss.on('connection', (socket) => {
    console.log('Connection established');
    socket.on('message', (message) => {
        let data: any;
        try {
            data = JSON.parse(message.toString());
        } catch (e) {
            sendTo(socket, "error", { message: "Invalid JSON" });
            return;
        }
        const { type, payload } = data;
        switch (type) {
            case "JOIN": {
                const { username, room } = payload || {};
                if (!username || !room) {
                    sendTo(socket, "error", { message: "Username and room are required to join" });
                    return;
                }
                
                if (clients.has(socket) && clients.get(socket)?.room === room) {
                    sendTo(socket, "system", { message: "You're already in this room" });
                    return;
                }
                
                clients.set(socket, { username, room });
                
                if (!rooms.has(room)) {
                    rooms.set(room, new Set());
                }
                rooms.get(room)?.add(socket);
                
                sendTo(socket, "system", { message: `You joined room` });
                broadcastToRoom(room, "system", { message: `${username} joined the room` }, socket);
                break;
            }
            case "MEMBERS": {
                const { room } = payload || {};
                sendTo(socket, "system", { message: clients.size });
                broadcastToRoom(room, "system", { message: `${clients.size}` }, socket);
                break;
            }

            case "CHAT": {
                const client = clients.get(socket);
                if (!client || !client.room) {
                    sendTo(socket, "system", { message: "You need to join a room first" });
                    return;
                }

                const { message } = payload || {};
                if (!message) {
                    sendTo(socket, "error", { message: "Message cannot be empty" });
                    return;
                }

                broadcastToRoom(client.room, "chat", {
                    from: client.username,
                    message,
                    timestamp: new Date().toISOString()
                });
                break;
            }

            case "LEAVE": {
                const client = clients.get(socket);
                if (!client || !client.room) {
                    sendTo(socket, "system", { message: "You're not in any room" });
                    return;
                }

                const { room, username } = client;
                rooms.get(room)?.delete(socket);
                if (rooms.get(room)?.size === 0) {
                    rooms.delete(room);
                }
                clients.set(socket, { username, room: null });

                sendTo(socket, "system", { message: "You left the room" });
                broadcastToRoom(room, "system", { message: `username left the room` }, socket);
                break;
            }

            default:
                sendTo(socket, "error", { message: "Unknown message type" });
                break;
        }
    });

    socket.on('close', () => {
        const client = clients.get(socket);
        if (client && client.room) {
            const { room, username } = client;
            rooms.get(room)?.delete(socket);
            if (rooms.get(room)?.size === 0) {
                rooms.delete(room);
            }
            broadcastToRoom(room, "system", { message: `username disconnected` }, socket);
        }
        clients.delete(socket);
    });
});

console.log('WebSocket server running on ws://localhost:4001');