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
exports.getSingleChat = exports.getChats = exports.createChat = void 0;
const chatModel_1 = __importDefault(require("../../models/chatModel"));
const chatValidation_1 = __importDefault(require("./chatValidation"));
const createChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = (0, chatValidation_1.default)(req.body);
    if (error) {
        return res.status(404).send({ message: error.details[0].message });
    }
    let userId = req.userId;
    let chat = yield chatModel_1.default.findOne({ members: { $all: [userId, req.body.secondUserId] } });
    if (chat) {
        return res.status(404).send(chat);
    }
    let newChat = new chatModel_1.default({
        members: [userId, req.body.secondUserId]
    });
    let savedChat = yield newChat.save();
    if (!savedChat) {
        return res.status(500).send({ message: "error occured while creating chat" });
    }
    res.send(savedChat);
});
exports.createChat = createChat;
const getChats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let userId = req.userId;
    let chats = yield chatModel_1.default.find({ members: { $in: [userId] } });
    if (chats.length < 1) {
        return res.status(404).send({ message: "chat not found" });
    }
    return res.send(chats);
});
exports.getChats = getChats;
const getSingleChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { secondId } = req.params;
    let userId = req.userId;
    let chat = yield chatModel_1.default.findOne({ members: { $all: [userId, secondId] } });
    if (chat) {
        return res.status(404).send(chat);
    }
    res.status(404).send({ message: "No chat found" });
});
exports.getSingleChat = getSingleChat;
