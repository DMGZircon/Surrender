// server/models/AnalysisResult.js
import mongoose from 'mongoose';

// Define the schema for the analysis results
const AnalysisResultSchema = new mongoose.Schema({
  postId: { type: String, required: true },
  date: { type: String, required: true },
  overallScore: { type: Number, required: true },
  overallSentiment: { type: String, required: true }
});

// Create a model based on the schema
const AnalysisResult = mongoose.model('AnalysisResult', AnalysisResultSchema);

export default AnalysisResult;  // Export the model for use in other files
