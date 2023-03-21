import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../lib/dbConnect';
import Event from '../../models/Event';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== 'PUT') {
      return res.status(400).json({ message: 'Invalid method' });
    }

    const {
      _id,
      title,
      startTime,
      endTime,
    }: { _id: string; title: string; startTime: number; endTime: number } =
      req.body;

    await dbConnect();

    const event = await Event.findById(_id);

    // if doesn't exist in database
    if (!event) {
      return res.status(400).json({ message: 'Invalid _id' });
    }

    await Event.findByIdAndUpdate(_id, {
      $set: {
        title,
        startTime,
        endTime,
      },
    });

    return res.status(200).json({ message: 'Event changed.' });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
}
