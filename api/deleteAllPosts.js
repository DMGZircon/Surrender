// pages/api/deleteAllPosts.js
import { connectDb, AnalysisResult } from '../../server/database.js';

export default async function handler(req, res) {
    if (req.method !== 'DELETE') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        await connectDb(); // Ensure the database is connected
        await AnalysisResult.deleteMany(); // Delete all results
        res.status(200).json({ message: 'All posts deleted successfully' });
    } catch (error) {
        console.error('Error deleting all posts:', error);
        res.status(500).json({ error: 'Failed to delete all posts' });
    }
}
