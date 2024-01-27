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
const express_1 = __importDefault(require("express"));
const chatModel_1 = __importDefault(require("../models/chatModel"));
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const router = express_1.default.Router();
router.post("/:secondId", authMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { secondId } = req.params;
    let userId = req.userId;
    let chat = yield chatModel_1.default.findOne({ members: { $all: [userId, secondId] } });
    if (chat) {
        return res.status(404).send(chat);
    }
    let newChat = new chatModel_1.default({
        members: [userId, secondId]
    });
    let savedChat = yield newChat.save();
    if (!savedChat) {
        return res.status(500).send({ message: "error occured while creating chat" });
    }
    res.send(savedChat);
}));
router.get("/", authMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let userId = req.userId;
    let chats = yield chatModel_1.default.find({ members: { $in: userId } });
    if (chats.length < 1) {
        return res.status(404).send({ message: "chat not found" });
    }
    return res.send(chats);
}));
router.get("/single/:secondId", authMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { secondId } = req.params;
    let userId = req.userId;
    let chat = yield chatModel_1.default.findOne({ members: { $all: [userId, secondId] } });
    if (chat) {
        return res.status(404).send(chat);
    }
    res.status(404).send({ message: "No chat found" });
}));
exports.default = router;
