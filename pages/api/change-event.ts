import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../lib/db';

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
    const db = await connectToDatabase();

    const exists = await db
      .collection('events')
      .findOne({ _id: new ObjectId(_id) });

    if (!exists) {
      return res.status(400).json({ message: 'Invalid _id' });
    }

    await db.collection('events').findOneAndUpdate(
      { _id: new ObjectId(_id) },
      {
        $set: {
          title: title,
          startTime: new Date(startDate).getTime(),
          endTime: new Date(endDate).getTime(),
        },
      }
    );

    return res.status(200).json({ message: 'Event changed.' });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
}
