import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../lib/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(400).json({ message: 'Invalid method.' });
  }

  const { title, startTime, endTime, color } = req.body;

  if (!title || !startTime || !endTime || !color) {
    return res
      .status(400)
      .json({ message: 'Invalid title, color, startTime or endTime' });
  }

  const db = await connectToDatabase();

  const eventId = (
    await db.collection('events').insertOne({
      title,
      startTime,
      endTime,
      color,
    })
  ).insertedId;

  const event = await db.collection('events').findOne({ _id: eventId });

  return res
    .status(200)
    .json({ message: 'Successfully added a new event.', event });
}
