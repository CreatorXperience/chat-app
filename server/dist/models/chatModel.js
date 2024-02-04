"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
let chatSchema = new mongoose_1.default.Schema({
    members: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "users" }],
}, { timestamps: true });
let ChatModel = mongoose_1.default.model("chats", chatSchema);
exports.default = ChatModel;
