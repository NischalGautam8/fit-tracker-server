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
exports.getUserById = exports.loginUser = exports.registerUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Register a new user
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Hash the password
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashedPassword = yield bcrypt_1.default.hash(req.body.password, salt);
        // Create a new user
        const newUser = new User_1.default({
            username: req.body.username,
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        });
        // Save the user
        const savedUser = yield newUser.save();
        res.status(201).json(savedUser);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});
exports.registerUser = registerUser;
// Login user
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Find the userby email or username
        const user = yield User_1.default.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        // Check password
        const validPassword = yield bcrypt_1.default.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: "Invalid password" });
        }
        // Create and assign a token
        const token = jsonwebtoken_1.default.sign({ _id: user._id }, process.env.TOKEN_SECRET || 'secret');
        res.header('auth-token', token).json({ token: token, userId: user._id, user: user });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.loginUser = loginUser;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(req.params.id);
        res.json(user);
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});
exports.getUserById = getUserById;
