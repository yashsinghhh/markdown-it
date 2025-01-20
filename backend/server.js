const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: '../.env' });

const app = express();
const PORT = process.env.PORT || 5174;

// Middleware
app.use(cors({
  origin: ['http://localhost', 'http://localhost:80'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const apiRoutes = require('./routes/api.routes');
app.use('/api', apiRoutes);

// Basic route
app.get('/', (req, res) => {
  res.json({ message: "Welcome to the Markdown Blog API" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});