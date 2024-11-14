import { connectDb, AnalysisResult } from '../database.js';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        await connectDb(); // Establish the connection to the database
        const newResult = await AnalysisResult.create(req.body); // Save the analysis result
        res.status(201).json({ message: 'Analysis result saved successfully', data: newResult });
    } catch (error) {
        console.error('Error saving analysis result:', error);
        res.status(500).json({ error: 'Failed to save analysis result' });
    }
}
