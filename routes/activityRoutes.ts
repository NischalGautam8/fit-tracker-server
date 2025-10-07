import express, { RequestHandler } from 'express';
import { addActivity, getActivities ,getActivityById,deleteActivity, deleteAllActivities} from '../controllers/activityController';

const router = express.Router();

router.post('/', addActivity as RequestHandler);
router.get('/', getActivities as RequestHandler);
router.delete('/:id', deleteActivity as RequestHandler);
router.delete('/', deleteAllActivities as RequestHandler);
router.get('/:id', getActivityById as RequestHandler);

export default router;
