"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const activityController_1 = require("../controllers/activityController");
const router = express_1.default.Router();
router.post('/', activityController_1.addActivity);
router.get('/', activityController_1.getActivities);
exports.default = router;
