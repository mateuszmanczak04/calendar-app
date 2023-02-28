import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../lib/dbConnect';
import Event from '../../models/Event';
import User from '../../models/User';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== 'POST') {
      return res.status(400).json({ message: 'Invalid method.' });
    }

    const { title, startTime, endTime, color, authorEmail } = req.body;

    if (!title || !startTime || !endTime || !color || !authorEmail) {
      return res.status(400).json({
        message: 'Invalid title, color, startTime, endTime or authorEmail',
      });
    }

    await dbConnect();

    const user = await User.findOne({ email: authorEmail });

    const event = await Event.create({
      title,
      startTime,
      endTime,
      color,
      author: user._id,
    });

    return res
      .status(200)
      .json({ message: 'Successfully added a new event.', event });
  } catch (err) {
    return res.status(500).json({ message: 'Server error.' });
  }
}
