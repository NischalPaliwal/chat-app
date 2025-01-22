"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({
    port: 2322
});
let allSockets = [];
wss.on('connection', (socket) => {
    socket.on('message', (message) => {
        // @ts-ignore
        const parsedMessage = JSON.parse(message);
        if (parsedMessage.type === "join") {
            console.log("user joined room #" + parsedMessage.payload.roomId);
            allSockets.push({
                socket,
                room: parsedMessage.payload.roomId
            });
        }
        if (parsedMessage.type === "chat") {
            console.log("user wants to chat!");
            const currentUserRoom = allSockets.find((x) => x.socket == socket);
            allSockets.forEach((s) => {
                if (s.room == (currentUserRoom === null || currentUserRoom === void 0 ? void 0 : currentUserRoom.room)) {
                    s.socket.send(parsedMessage.payload.message);
                }
            });
        }
    });
});
