import mongoose, { Schema, Document } from 'mongoose';

interface IActivity extends Document {
  activityType: string;
  caloriesBurned: number;
  systolicBloodPressure:number;
  diastolicBloodPressure:number;
  bloodOxygenLevel:number;
  duration:number;
  heartRate: number;
  date: Date;
  createdBy: mongoose.Schema.Types.ObjectId;
}

const activitySchema: Schema = new Schema({
  activityType: { type: String, required: true },
  caloriesBurned: { type: Number, required: true },
  heartRate: { type: Number, required: true },
  bloodOxygenLevel: { type: Number, required: true }, // Optional field with default value
  duration: { type: Number, required: true }, // Duration in minutes
  systolicBloodPressure: { type: Number, required: true }, // Optional field with default value
  diastolicBloodPressure: { type: Number, required: true }, // Optional field
  date: { type: Date, default: Date.now },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

export default mongoose.model<IActivity>('Activity', activitySchema);
