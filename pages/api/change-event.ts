import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../lib/dbConnect';
import Event from '../../models/Event';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== 'POST') {
      return res.status(400).json({ message: 'Invalid method' });
    }

    const {
      _id,
      title,
      startDate,
      endDate,
    }: { _id: string; title: string; startDate: Date; endDate: Date } =
      req.body;

    await dbConnect();

    const event = await Event.findById(_id);

    // if doesn't exist in database
    if (!event) {
      return res.status(400).json({ message: 'Invalid _id' });
    }

    await Event.findByIdAndUpdate(_id, {
      $set: {
        title: title,
        startTime: new Date(startDate).getTime(),
        endTime: new Date(endDate).getTime(),
      },
    });

    return res.status(200).json({ message: 'Event changed.' });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
}
