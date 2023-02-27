import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../lib/dbConnect';
import Event from '../../models/Event';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== 'POST') {
      return res.status(400).json({ message: 'Invalid method.' });
    }

    const { title, startTime, endTime, color } = req.body;

    if (!title || !startTime || !endTime || !color) {
      return res
        .status(400)
        .json({ message: 'Invalid title, color, startTime or endTime' });
    }

    await dbConnect();

    const event = await Event.create({ title, startTime, endTime, color });

    return res
      .status(200)
      .json({ message: 'Successfully added a new event.', event });
  } catch (err) {
    return res.status(500).json({ message: 'Server error.' });
  }
}
