const Order = require('../models/Order');
const Customer = require('../models/Customer');
const Product = require('../models/Product');

exports.createOrder = async (req, res) => {
  try {
    const { customerId, items, shippingAddress, notes, tax = 0, shippingCost = 0 } = req.body;

    if (!customerId || !items || items.length === 0) {
      return res.status(400).json({ message: 'customerId and items are required' });
    }

    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    let subtotal = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ message: `Product with ID ${item.productId} not found` });
      }

      if (product.inventory.quantity < item.quantity) {
        return res.status(400).json({ message: `Insufficient inventory for ${product.name}` });
      }

      const itemSubtotal = product.price * item.quantity;
      subtotal += itemSubtotal;

      orderItems.push({
        productId: product._id,
        productName: product.name,
        quantity: item.quantity,
        unitPrice: product.price,
        subtotal: itemSubtotal
      });

      product.inventory.quantity -= item.quantity;
      await product.save();
    }

    const total = subtotal + tax + shippingCost;
    const orderNumber = 'ORD-' + Date.now();

    const order = new Order({
      orderNumber,
      customerId,
      customerName: `${customer.firstName} ${customer.lastName}`,
      items: orderItems,
      subtotal,
      tax,
      shippingCost,
      total,
      shippingAddress: shippingAddress || customer.address,
      notes
    });

    await order.save();
    res.status(201).json({ message: 'Order created successfully', order });
  } catch (error) {
    res.status(500).json({ message: 'Error creating order', error: error.message });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('customerId', 'firstName lastName email');
    res.status(200).json({ count: orders.length, orders });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving orders', error: error.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('customerId');
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving order', error: error.message });
  }
};

exports.getOrdersByCustomerId = async (req, res) => {
  try {
    const orders = await Order.find({ customerId: req.params.customerId });
    res.status(200).json({ count: orders.length, orders });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving orders', error: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: 'status is required' });
    }

    const validStatuses = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: `status must be one of: ${validStatuses.join(', ')}` });
    }

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.status = status;
    await order.save();
    res.status(200).json({ message: 'Order status updated successfully', order });
  } catch (error) {
    res.status(500).json({ message: 'Error updating order', error: error.message });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    for (const item of order.items) {
      const product = await Product.findById(item.productId);
      if (product) {
        product.inventory.quantity += item.quantity;
        await product.save();
      }
    }

    res.status(200).json({ message: 'Order deleted successfully', order });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting order', error: error.message });
  }
};
