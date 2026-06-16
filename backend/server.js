const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/productCatalog')
.then(() => console.log('✅ MongoDB Connected!'))
.catch((err) => console.log('❌ MongoDB Error:', err));

// Routes
const productRoutes = require('./routes/products');
app.use('/api/products', productRoutes);

// Home route
app.get('/', (req, res) => {
  res.send('Task 14 - Search, Sort, Filter API is running!');
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});