"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const signupValidation_1 = __importDefault(require("./signup/signupValidation"));
const registerUser = (req, res) => {
    let { error } = (0, signupValidation_1.default)(lodash_1.default.pick(req.body, ["name", "email", "password"]));
    if (error) {
        return res.status(404).send({ message: error.details[0].message });
    }
};
exports.default = registerUser;
