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
const joi_1 = __importDefault(require("joi"));
const joi_password_complexity_1 = __importDefault(require("joi-password-complexity"));
const authValidation = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    let passOptions = {
        min: 6,
        max: 20,
        upperCase: 1,
        lowerCase: 1,
        symbol: 1
    };
    let schema = joi_1.default.object({
        password: (0, joi_password_complexity_1.default)(passOptions),
        email: joi_1.default.string().email().required()
    });
    return schema.validate(payload);
});
exports.default = authValidation;
