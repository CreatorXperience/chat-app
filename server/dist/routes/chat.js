"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const chatController_1 = require("../controllers/chat/chatController");
const router = express_1.default.Router();
router.post("/", authMiddleware_1.default, chatController_1.createChat);
router.get("/", authMiddleware_1.default, chatController_1.getChats);
router.get("/find/:secondId", authMiddleware_1.default, chatController_1.getSingleChat);
exports.default = router;
