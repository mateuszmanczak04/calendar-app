import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../lib/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== 'POST') {
      return res.status(400).json({ message: 'Invalid method.' });
    }

    const { _id, title } = req.body;

    if (!_id || !title) {
      return res.status(400).json({ message: 'Invalid id or title.' });
    }

    const db = await connectToDatabase();

    await db
      .collection('events')
      .updateOne({ _id: new ObjectId(_id) }, { $set: { title } });

    return res.status(200).json({ message: 'Successfully renamed an event.' });
  } catch (err) {
    return res.status(500).json({ message: 'Server error.' });
  }
}
