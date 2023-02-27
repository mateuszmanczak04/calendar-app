import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/dbConnect';
import Event from '../../../models/Event';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== 'DELETE') {
      return res.status(400).json({ message: 'Invalid method ' });
    }

    const { _id } = req.query;

    if (!_id) {
      return res.status(400).json({ message: 'Invalid _id' });
    }

    dbConnect();

    await Event.findByIdAndDelete(_id);

    return res.status(200).json({ message: 'Event removed' });
  } catch (err) {
    return res.status(500).json({ message: 'Server error.' });
  }
}
