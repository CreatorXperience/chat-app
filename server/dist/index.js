"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const mongoDbConnection_1 = __importDefault(require("./mongoDbConnection"));
(0, dotenv_1.config)();
const app = (0, express_1.default)();
let port = process.env.PORT || 5000;
if (!process.env.SECRET) {
    process.exit(1);
}
(0, mongoDbConnection_1.default)(app, port);
