"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const joi_password_complexity_1 = __importDefault(require("joi-password-complexity"));
const signupValidation = (payload) => {
    let passOptions = {
        min: 6,
        max: 20,
        upperCase: 1,
        lowerCase: 1,
        symbol: 1
    };
    let schema = joi_1.default.object({
        name: joi_1.default.string().required(),
        password: (0, joi_password_complexity_1.default)(passOptions),
        email: joi_1.default.string().email().required()
    });
    return schema.validate(payload);
};
exports.default = signupValidation;
