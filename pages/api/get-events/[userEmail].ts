import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/dbConnect';
import Event from '../../../models/Event';
import User from '../../../models/User';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(400).json({ message: 'Invalid method' });
  }

  try {
    const { userEmail } = req.query;

    if (!userEmail) {
      return res.status(400).json({ message: 'Invalid user email' });
    }

    dbConnect();

    const user = await User.findOne({ email: userEmail });

    const events = await Event.find({ author: user._id });

    return res.status(200).json({ events });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
}
