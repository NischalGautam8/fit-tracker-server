import Activity from '../models/Activity';
import { Request, Response } from "express";

// Add a new activity
export const addActivity = async (req: Request, res: Response) => {
  try {
    const userId = req.body.userId;
    const newActivity = new Activity({ ...req.body, createdBy: userId });
    const savedActivity = await newActivity.save();
    res.status(201).json(savedActivity);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

// Get all activities
export const getActivities = async (req: Request, res: Response) => {
  try {
    const activities = await Activity.find();
    res.json(activities);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
export const deleteActivity = async (req: Request, res: Response) => {
  try {
    const activityId = req.params.id;
    const deletedActivity = await Activity.findByIdAndDelete(activityId);
    if (!deletedActivity) {
      return res.status(404).json({ message: "Activity not found" });
    }
    res.status(200).json({ message: "Activity deleted successfully" });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
