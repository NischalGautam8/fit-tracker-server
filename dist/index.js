"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const activityRoutes_1 = __importDefault(require("./routes/activityRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const uri = process.env.ATLAS_URI || 'mongodb://localhost:27017/mern';
mongoose_1.default.connect(uri)
    .then(() => console.log('MongoDB connection established successfully'))
    .catch(err => console.log('MongoDB connection error:', err));
app.use('/activities', activityRoutes_1.default);
app.use('/users', userRoutes_1.default);
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
