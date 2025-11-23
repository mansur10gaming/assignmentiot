const Product = require('../models/Product');

exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, category, sku, manufacturer, inventory } = req.body;

    if (!name || !price || !category || !sku) {
      return res.status(400).json({ message: 'name, price, category, and sku are required' });
    }

    const existingProduct = await Product.findOne({ sku });
    if (existingProduct) {
      return res.status(409).json({ message: 'Product with this SKU already exists' });
    }

    const product = new Product({
      name,
      description,
      price,
      category,
      sku,
      manufacturer,
      inventory: inventory || { quantity: 0 }
    });

    await product.save();
    res.status(201).json({ message: 'Product created successfully', product });
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error: error.message });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ count: products.length, products });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving products', error: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving product', error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { name, description, price, category, sku, manufacturer, inventory } = req.body;

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (sku && sku !== product.sku) {
      const existingProduct = await Product.findOne({ sku });
      if (existingProduct) {
        return res.status(409).json({ message: 'SKU already in use' });
      }
      product.sku = sku;
    }

    if (name) product.name = name;
    if (description) product.description = description;
    if (price) product.price = price;
    if (category) product.category = category;
    if (manufacturer) product.manufacturer = manufacturer;
    if (inventory) product.inventory = inventory;

    await product.save();
    res.status(200).json({ message: 'Product updated successfully', product });
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error: error.message });
  }
};

exports.updateInventory = async (req, res) => {
  try {
    const { quantity } = req.body;

    if (quantity === undefined) {
      return res.status(400).json({ message: 'quantity is required' });
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.inventory.quantity = quantity;
    await product.save();
    res.status(200).json({ message: 'Inventory updated successfully', product });
  } catch (error) {
    res.status(500).json({ message: 'Error updating inventory', error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully', product });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
};
