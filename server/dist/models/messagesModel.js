"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
let messageSchema = new mongoose_1.default.Schema({
    chatId: { type: mongoose_1.default.Schema.Types.ObjectId, required: true, ref: 'chats' },
    senderId: { type: String, required: true },
    text: { type: String, required: true }
});
let MessageModel = mongoose_1.default.model("messages", messageSchema);
exports.default = MessageModel;
