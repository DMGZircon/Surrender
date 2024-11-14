// pages/api/getTopPosts.js
import { connectDb, AnalysisResult } from '../../server/database.js';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        await connectDb(); // Ensure the database is connected
        const topPosts = await AnalysisResult.find()
            .sort({ overallScore: -1 }) // Sort by overallScore descending
            .limit(5); // Get top 5 posts
        res.status(200).json({ data: topPosts });
    } catch (error) {
        console.error('Error fetching top posts:', error);
        res.status(500).json({ error: 'Failed to fetch top posts' });
    }
}
