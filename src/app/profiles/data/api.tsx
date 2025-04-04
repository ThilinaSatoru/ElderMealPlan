import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const apiResponse = await fetch('http://127.0.0.1:5000/profile/');
        const data = await apiResponse.json();
        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching profiles:', error);
        res.status(500).json({ error: 'Failed to fetch profiles' });
    }
}
