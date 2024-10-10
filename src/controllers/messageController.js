const Message = require('../models/Message');

const sendMessage = async (req, res) => {
    const { content, senderId, roomId } = req.body;

    const message = new Message({ content, senderId, roomId });

    try {
        await message.save();
        res.status(201).json(message);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao enviar a mensagem.', error: err });
    }
};

module.exports = { sendMessage }; 
