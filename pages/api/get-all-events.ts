import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../lib/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== 'GET') {
      return res.status(400).json({ message: 'Invalid method.' });
    }

    const db = await connectToDatabase();

    const events = await db
      .collection('events')
      .find()
      .sort({ startTime: 1 })
      .toArray();

    return res.status(200).json({ events });
  } catch (err) {
    return res.status(500).json({ message: 'Server error.' });
  }
}
