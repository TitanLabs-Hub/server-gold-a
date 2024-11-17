import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(401).json({ error: 'Unauthorized - Invalid API Key' });
}