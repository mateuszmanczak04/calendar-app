import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: String,
  startTime: Number,
  endTime: Number,
  color: String,
  author: String,
});

export default mongoose.models.Event || mongoose.model('Event', eventSchema);
