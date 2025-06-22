import express, { RequestHandler } from 'express';
import { addActivity, getActivities ,deleteActivity} from '../controllers/activityController';

const router = express.Router();

router.post('/', addActivity as RequestHandler);
router.get('/', getActivities as RequestHandler);
router.delete('/:id', deleteActivity as RequestHandler);

export default router;
