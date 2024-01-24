"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signupSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, maxlength: 1024 }
}, { methods: {
        generateToken: function () {
            let secret = process.env.SECRET;
            return jsonwebtoken_1.default.sign({ _id: this._id }, secret);
        }
    }, timestamps: true });
let SignupModel = mongoose_1.default.model("users", signupSchema);
exports.default = SignupModel;
