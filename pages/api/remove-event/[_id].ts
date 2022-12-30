import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../lib/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'DELETE') {
    return res.status(400).json({ message: 'Invalid method ' });
  }

  const { _id } = req.query;

  if (!_id) {
    return res.status(400).json({ message: 'Invalid _id' });
  }

  const db = await connectToDatabase();

  await db
    .collection('events')
    .deleteOne({ _id: new ObjectId(_id.toString()) });

  return res.status(200).json({ message: 'Event removed' });
}
