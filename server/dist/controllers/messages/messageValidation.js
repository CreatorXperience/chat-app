"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const messageValidation = (messagePayload) => {
    const schema = joi_1.default.object({
        chatId: joi_1.default.string().required(),
        senderId: joi_1.default.string().required(),
        text: joi_1.default.string().required()
    });
    return schema.validate(messagePayload);
};
exports.default = messageValidation;
