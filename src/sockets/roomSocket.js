const roomSocket = (io) => {
    io.on('connection', (socket) => {
        console.log('Usuário conectado:', socket.id);

        socket.on('joinRoom', (roomId) => {
            socket.join(roomId);
            console.log(`Usuário ${socket.id} entrou na sala ${roomId}`);
        });


        socket.on('sendMessage', (message) => {
            io.to(message.roomId).emit('receiveMessage', message);
            console.log('Mensagem enviada:', message);
        });

        socket.on('disconnect', () => {
            console.log('Usuário desconectado:', socket.id);
        });
    });
};

module.exports = roomSocket;
