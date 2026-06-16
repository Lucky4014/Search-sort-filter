const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// =============================================
// GET /api/products
// Search + Sort + Filter in one route
// =============================================
router.get('/', async (req, res) => {
  try {
    // ---- Extract query params ----
    const {
      search,       // search by name or brand
      category,     // filter by category
      minPrice,     // filter by min price
      maxPrice,     // filter by max price
      minRating,    // filter by minimum rating
      sortBy,       // field to sort by: price, rating, name
      order,        // asc or desc
    } = req.query;

    // ---- Build the Filter Object ----
    let filter = {};

    // 1. SEARCH: Search by name or brand (case-insensitive)
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { brand: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    // 2. FILTER by Category
    if (category) {
      filter.category = category;
    }

    // 3. FILTER by Price Range
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    // 4. FILTER by Minimum Rating
    if (minRating) {
      filter.rating = { $gte: Number(minRating) };
    }

    // ---- Build the Sort Object ----
    let sortOption = {};
    const validSortFields = ['price', 'rating', 'name', 'createdAt'];
    const sortField = validSortFields.includes(sortBy) ? sortBy : 'createdAt';
    const sortOrder = order === 'asc' ? 1 : -1;
    sortOption[sortField] = sortOrder;

    // ---- Run the Query ----
    const products = await Product.find(filter).sort(sortOption);

    // ---- Send Response ----
    res.json({
      success: true,
      count: products.length,
      filters: { search, category, minPrice, maxPrice, minRating },
      sort: { sortBy: sortField, order: order || 'desc' },
      products,
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// =============================================
// GET /api/products/:id  - Get single product
// =============================================
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// =============================================
// POST /api/products - Add a product
// =============================================
router.post('/', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({ success: true, product });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

module.exports = router;
