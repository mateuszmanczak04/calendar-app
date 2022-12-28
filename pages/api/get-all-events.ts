import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../lib/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(400).json({ message: 'Invalid method.' });
  }

  const db = await connectToDatabase();

  const events = await db.collection('events').find().toArray();

  return res.status(200).json({ events });
}
