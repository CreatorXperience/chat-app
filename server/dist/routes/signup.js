"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const signupControllers_1 = require("../controllers/signup/signupControllers");
const router = express_1.default.Router();
router.post("/", signupControllers_1.registerUser);
router.get("/users", signupControllers_1.getUser);
router.get("/user/:id/:chatId", signupControllers_1.getSingleUser);
exports.default = router;
