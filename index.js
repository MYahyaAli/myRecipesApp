require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// CORS configuration
const corsOptions = {
  // Allow only your frontend domain in production or all origins in development
  origin: process.env.NODE_ENV === 'production' ? process.env.ALLOWED_ORIGIN : '*',
  optionsSuccessStatus: 200, // For legacy browser support
  credentials: true, // Allow cookies to be sent
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
};

// Use CORS middleware with the above options
app.use(cors(corsOptions));

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB using the URI provided in the environment variables
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

// Import routes
const recipesRouter = require('./routes/recipes');

// Use the recipes routes as middleware, prefixing with `/api/recipes`
app.use('/api/recipes', recipesRouter);

// A simple test route
app.get('/', (req, res) => {
  res.send('Welcome to the Recipe App API!');
});

// Error-handling middleware for catching and responding to any errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server on the port specified in the environment variables or default to 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
