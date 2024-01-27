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
const mongoose_1 = __importDefault(require("mongoose"));
const connectionLogger_1 = __importDefault(require("../logger/connectionLogger"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const signup_1 = __importDefault(require("../routes/signup"));
const auth_1 = __importDefault(require("../routes/auth"));
const connectToMongoDBDatabase = (server, port) => __awaiter(void 0, void 0, void 0, function* () {
    let URI = process.env.URI;
    if (!URI) {
        return console.log("URI not provided");
    }
    try {
        yield mongoose_1.default.connect(URI);
        let responseHeaders = {
            allowedHeaders: ['Accept-Version', 'Authorization', 'Credentials', 'Content-Type'],
            exposedHeaders: ['Authorization']
        };
        server.listen(port, () => {
            connectionLogger_1.default.info("connected to mongodb server successfully");
        });
        server.use(express_1.default.json());
        server.use(express_1.default.urlencoded({ extended: true }));
        server.use((0, cors_1.default)(responseHeaders));
        server.use("/api/signup", signup_1.default);
        server.use("/api/login", auth_1.default);
        server.get("/", (req, res) => {
            res.send("welcome to this api");
        });
    }
    catch (err) {
        console.log("error couldn't connect to mongodb database", err);
    }
});
exports.default = connectToMongoDBDatabase;
