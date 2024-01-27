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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signupModel_1 = __importDefault(require("../models/signupModel"));
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token = req.header("Authorization");
    if (!token) {
        return res.status(401).send({ message: "Permission Denied. No token provided" });
    }
    try {
        let decoded = jsonwebtoken_1.default.decode(token);
        if (decoded) {
            let user = yield signupModel_1.default.findOne({ _id: decoded._id });
            if (!user) {
                return res.status(404).send({ message: "Permission Denied. User not found" });
            }
            req.userId = user._id.toHexString();
            next();
            return;
        }
        return res.status(400).send({ message: "Permission Denied. Invalid id" });
    }
    catch (e) {
        return res.status(500).send({ message: "error occured while reading token" });
    }
});
exports.default = authMiddleware;
