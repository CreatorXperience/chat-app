"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMessages = exports.postMessages = void 0;
const messagesModel_1 = __importDefault(require("../../models/messagesModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const messageValidation_1 = __importDefault(require("./messageValidation"));
const postMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = (0, messageValidation_1.default)(req.body);
    if (error) {
        return res.status(404).send({ message: error.details[0].message });
    }
    let { chatId, senderId, text } = req.body;
    let messagePayload = { chatId: new mongoose_1.default.Types.ObjectId(chatId), senderId, text };
    let newMessage = new messagesModel_1.default(messagePayload);
    let savedMessages = yield newMessage.save();
    return res.send(savedMessages);
});
exports.postMessages = postMessages;
const getMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { chatId } = req.params;
    const messages = yield messagesModel_1.default.find({ chatId: chatId });
    if (!messages) {
        return res.status(404).send({ message: "No messages found" });
    }
    return res.send(messages);
});
exports.getMessages = getMessages;
