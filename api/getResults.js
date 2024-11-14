// pages/api/getResults.js
import { connectDb, AnalysisResult } from '../../server/database.js';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        await connectDb(); // Ensure the database is connected
        const results = await AnalysisResult.find(); // Get all saved analysis results
        res.status(200).json({ data: results });
    } catch (error) {
        console.error('Error fetching results:', error);
        res.status(500).json({ error: 'Failed to fetch results' });
    }
}
