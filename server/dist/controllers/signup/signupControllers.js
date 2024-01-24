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
const lodash_1 = __importDefault(require("lodash"));
const signupValidation_1 = __importDefault(require("./signupValidation"));
const signupModel_1 = __importDefault(require("../../models/signupModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { error } = (0, signupValidation_1.default)(req.body);
    if (error) {
        return res.status(404).send({ message: error.details[0].message });
    }
    let user = yield signupModel_1.default.findOne({ email: req.body.email });
    if (user) {
        return res.status(404).send({ message: "user already exit" });
    }
    let newUser = new signupModel_1.default(lodash_1.default.pick(req.body, ["name", "email", "password"]));
    let salt = yield bcryptjs_1.default.genSalt(10);
    let hashedPass = yield bcryptjs_1.default.hash(newUser.password, salt);
    newUser.password = hashedPass;
    let saved = yield newUser.save();
    if (!saved) {
        return res.status(500).send({ message: "error occured while saving user" });
    }
    res.send(lodash_1.default.pick(saved, ["_id", "name", "email"]));
});
exports.default = registerUser;
