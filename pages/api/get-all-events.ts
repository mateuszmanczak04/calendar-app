import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../lib/dbConnect';
import Event from '../../models/Event';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== 'GET') {
      return res.status(400).json({ message: 'Invalid method.' });
    }

    await dbConnect();

    const events = await Event.find().sort({ startTime: 1 });

    return res.status(200).json({ events });
  } catch (err) {
    return res.status(500).json({ message: 'Server error.' });
  }
}
