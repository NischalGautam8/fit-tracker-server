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
exports.getActivities = exports.addActivity = void 0;
const Activity_1 = __importDefault(require("../models/Activity"));
// Add a new activity
const addActivity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newActivity = new Activity_1.default(req.body);
        const savedActivity = yield newActivity.save();
        res.status(201).json(savedActivity);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});
exports.addActivity = addActivity;
// Get all activities
const getActivities = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const activities = yield Activity_1.default.find();
        res.json(activities);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.getActivities = getActivities;
