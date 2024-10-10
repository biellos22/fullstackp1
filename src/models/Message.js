const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    content: { type: String, required: true },
    senderId: { type: String, required: true },
    roomId: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});


const Message = mongoose.models.Message || mongoose.model('Message', messageSchema);

module.exports = Message;
