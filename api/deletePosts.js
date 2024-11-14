// pages/api/deletePost.js
import { connectDb, AnalysisResult } from '../../server/database.js';

export default async function handler(req, res) {
    if (req.method !== 'DELETE') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { postId } = req.query; // Get the postId from the query parameters

    try {
        await connectDb(); // Ensure the database is connected
        const result = await AnalysisResult.findOneAndDelete({ postId }); // Delete result by postId
        if (!result) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ error: 'Failed to delete post' });
    }
}
