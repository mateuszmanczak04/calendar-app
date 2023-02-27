import { NextApiRequest, NextApiResponse } from 'next';
import validateEmail from '../../../lib/validateEmail';
import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';
import { hash } from 'bcryptjs';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return;
  }

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: 'Missing email or password.',
      });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: 'Your password must have at least 6 characters.' });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ message: 'Invalid e-mail.' });
    }

    await dbConnect();

    // check if user already exists in the database
    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: 'Email already in use.' });
    }

    const hashedPassword = await hash(password, 10);

    await User.create({ email: email.toLowerCase(), password: hashedPassword });

    return res.status(201).json({ message: 'Successfully registered.' });
  } catch (err) {
    return res.status(500).json({ message: 'Server error.' });
  }
}
