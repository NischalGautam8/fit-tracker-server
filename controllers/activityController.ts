import Activity from '../models/Activity';
import { Request, Response } from "express";

// Add a new activity
export const addActivity = async (req: Request, res: Response) => {
  try {
    const newActivity = new Activity({ ...req.body});
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
export const getActivityById = async (req: Request, res: Response) => {
  try {
    const activityId = req.params.id;
    const activity = await Activity.findById(activityId);
    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }
    res.json(activity);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteAllActivities = async (req: Request, res: Response) => {
  try {
    await Activity.deleteMany({});
    res.status(200).json({ message: "All activities deleted successfully" });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const getActivitiesByDays = async (req: Request, res: Response) => {
  try {
    const days = parseInt(req.params.days);
    
    if (isNaN(days) || days <= 0) {
      return res.status(400).json({ message: "Days must be a positive number" });
    }

    // Calculate the date N days ago
    const dateThreshold = new Date();
    dateThreshold.setDate(dateThreshold.getDate() - days);

    // Find activities from the past N days
    const activities = await Activity.find({
      date: { $gte: dateThreshold }
    }).sort({ date: -1 }); // Sort by date descending (newest first)

    res.json({
      days,
      dateFrom: dateThreshold,
      count: activities.length,
      activities
    });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
