import express, { Router } from 'express';
const router: Router = express.Router();
import { registerUser, loginUser } from '../controllers/userController';
import { RequestHandler } from 'express';

router.post('/register', registerUser as RequestHandler);
router.post('/login', loginUser as RequestHandler);

export default router;
