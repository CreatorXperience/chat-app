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
const authValidation_1 = __importDefault(require("./authValidation"));
const signupModel_1 = __importDefault(require("../../models/signupModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const lodash_1 = __importDefault(require("lodash"));
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { error } = yield (0, authValidation_1.default)(req.body);
    if (error) {
        return res.status(404).send({ message: error.details[0].message, status: 404 });
    }
    let user = yield signupModel_1.default.findOne({ email: req.body.email });
    if (!user) {
        return res.status(404).send({ message: "user doesn't exist", status: 404 });
    }
    let isPassEqual = yield bcryptjs_1.default.compare(req.body.password, user.password);
    if (!isPassEqual) {
        return res.status(404).send({ message: "Invalid email or password", status: 404 });
    }
    let token = user.generateToken();
    let userResponse = Object.assign(Object.assign({}, lodash_1.default.pick(user, ["name", "email", "_id"])), { token: token, status: 200 });
    res.appendHeader("Authorization", token)
        .send(userResponse);
});
exports.default = loginUser;
