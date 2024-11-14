// server/database.js
import mongoose from 'mongoose';

// MongoDB Atlas URI (use environment variable for security)
const dbURI = process.env.MONGO_DB_URI || 'mongodb+srv://codesmiths9:o8nDKrFh6bv7WdMD@cluster0.fulpi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; // Replace with your MongoDB URI

// Connect to MongoDB Atlas
const connectDb = async () => {
  try {
    await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB Atlas');
  } catch (err) {
    console.error('Failed to connect to MongoDB Atlas:', err.message);
  }
};

// Define the schema for the analysis results
const AnalysisResultSchema = new mongoose.Schema({
  postId: { type: String, required: true },
  date: { type: String, required: true },
  overallScore: { type: Number, required: true },
  overallSentiment: { type: String, required: true }
});

// Create a model based on the schema
const AnalysisResult = mongoose.model('AnalysisResult', AnalysisResultSchema);

// Connect to the database
connectDb();

export { mongoose, AnalysisResult };  // Export mongoose and model for use in other files
