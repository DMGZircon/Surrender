// server/server.js
import express from 'express';
import 'dotenv/config';
import bodyParser from 'body-parser';
import cors from 'cors';
import AnalysisResult from './models/AnalysisResult.js'; // Import the Mongoose model

const app = express();
const PORT = process.env.PORT || 5000; // Use port 3000 for Vercel

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Endpoint to save analysis results
app.post('/api/saveResult', async (req, res) => {
  const { postId, date, overallScore, overallSentiment } = req.body;

  try {
    const newResult = new AnalysisResult({
      postId,
      date,
      overallScore,
      overallSentiment,
    });

    await newResult.save();
    res.status(200).send('Analysis result saved successfully');
  } catch (error) {
    console.error('Error saving analysis result:', error.message);
    res.status(500).send('Error saving analysis result');
  }
});

// Endpoint to retrieve all analysis results
app.get('/api/getResults', async (req, res) => {
  try {
    const results = await AnalysisResult.find();
    res.status(200).json(results);
  } catch (error) {
    console.error('Error retrieving results:', error.message);
    res.status(500).send('Error retrieving results');
  }
});

// Endpoint to get top posts
app.get('/api/getTopPosts', async (req, res) => {
  try {
    const topPosts = await AnalysisResult.find().sort({ overallScore: -1 }).limit(10);
    res.status(200).json(topPosts);
  } catch (error) {
    console.error('Error fetching top posts:', error.message);
    res.status(500).send('Error fetching top posts');
  }
});

// Endpoint to delete a specific post
app.delete('/api/deletePost/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await AnalysisResult.findByIdAndDelete(id);
    if (result) {
      res.status(200).send(`Post with ID ${id} deleted successfully`);
    } else {
      res.status(404).send(`Post with ID ${id} not found`);
    }
  } catch (error) {
    console.error('Error deleting post:', error.message);
    res.status(500).send('Internal server error');
  }
});

// Endpoint to delete all posts
app.delete('/api/deleteAllPosts', async (req, res) => {
  try {
    await AnalysisResult.deleteMany({});
    res.status(200).send('All posts deleted successfully');
  } catch (error) {
    console.error('Error deleting all posts:', error.message);
    res.status(500).send('Error deleting all posts');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
