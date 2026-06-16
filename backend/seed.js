const mongoose = require('mongoose');
const Product = require('./models/Product');

mongoose.connect('mongodb://localhost:27017/productCatalog');

const products = [
  { name: 'iPhone 15 Pro', category: 'Electronics', price: 1299, rating: 4.8, stock: 50, brand: 'Apple', description: 'Latest Apple smartphone with titanium body' },
  { name: 'Samsung Galaxy S24', category: 'Electronics', price: 999, rating: 4.6, stock: 80, brand: 'Samsung', description: 'Flagship Android phone with AI features' },
  { name: 'Sony WH-1000XM5', category: 'Electronics', price: 349, rating: 4.9, stock: 30, brand: 'Sony', description: 'Best noise cancelling headphones' },
  { name: 'Nike Air Max 270', category: 'Sports', price: 150, rating: 4.5, stock: 100, brand: 'Nike', description: 'Comfortable running shoes' },
  { name: 'Adidas Ultraboost', category: 'Sports', price: 180, rating: 4.7, stock: 60, brand: 'Adidas', description: 'Premium running shoes with boost technology' },
  { name: 'Levi\'s 501 Jeans', category: 'Clothing', price: 80, rating: 4.3, stock: 200, brand: 'Levis', description: 'Classic straight fit jeans' },
  { name: 'The Alchemist', category: 'Books', price: 15, rating: 4.8, stock: 500, brand: 'Paulo Coelho', description: 'Bestselling novel about following your dreams' },
  { name: 'Atomic Habits', category: 'Books', price: 18, rating: 4.9, stock: 300, brand: 'James Clear', description: 'Guide to building good habits' },
  { name: 'Dyson V15 Vacuum', category: 'Home', price: 750, rating: 4.7, stock: 25, brand: 'Dyson', description: 'Powerful cordless vacuum cleaner' },
  { name: 'Instant Pot Duo', category: 'Home', price: 99, rating: 4.6, stock: 150, brand: 'Instant Pot', description: '7-in-1 electric pressure cooker' },
  { name: 'MAC Lipstick Ruby', category: 'Beauty', price: 22, rating: 4.4, stock: 400, brand: 'MAC', description: 'Long-lasting red lipstick' },
  { name: 'Nivea Moisturizer', category: 'Beauty', price: 12, rating: 4.2, stock: 600, brand: 'Nivea', description: '24h moisture cream for all skin types' },
  { name: 'OnePlus 12', category: 'Electronics', price: 799, rating: 4.5, stock: 45, brand: 'OnePlus', description: 'Flagship phone with Hasselblad camera' },
  { name: 'Yoga Mat Pro', category: 'Sports', price: 45, rating: 4.4, stock: 200, brand: 'Liforme', description: 'Non-slip premium yoga mat' },
  { name: 'Zara Summer Dress', category: 'Clothing', price: 65, rating: 4.1, stock: 120, brand: 'Zara', description: 'Floral print casual summer dress' },
];

async function seedDB() {
  try {
    await Product.deleteMany({});
    console.log('🗑️ Old data deleted');
    await Product.insertMany(products);
    console.log('✅ Sample data inserted successfully!');
    mongoose.disconnect();
  } catch (err) {
    console.error('❌ Seeding failed:', err);
    mongoose.disconnect();
  }
}

seedDB();