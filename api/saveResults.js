// pages/api/saveResult.js
import { connectDb, AnalysisResult } from '../../server/database.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { postId, date, overallScore, overallSentiment } = req.body;

  try {
    console.log('Received data:', { postId, date, overallScore, overallSentiment });

    // Connect to the database
    await connectDb();

    // Save analysis result
    const newResult = new AnalysisResult({
      postId,
      date,
      overallScore,
      overallSentiment,
    });
    await newResult.save();

    console.log('Successfully saved analysis result');
    res.status(200).json({ message: 'Analysis result saved successfully' });
  } catch (error) {
    console.error('Error occurred:', error);
    res.status(500).json({ error: 'Failed to save analysis result', details: error.message });
  }
}
