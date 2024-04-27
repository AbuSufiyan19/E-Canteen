const express = require('express');
const router = express.Router();

const paymentController = require('../controller/paymentController');

// payment_route.get('/', paymentController.renderProductPage);
router.post('/createOrder', paymentController.createOrder);


// Assume 'Order' is your Mongoose model for storing order details
const Order = require('../models/Order');
const Cart = require('../models/cartModel');
const Product = require('../models/productModel');

// Define a route to save order details after successful payment
router.post('/saveOrderDetails', async (req, res) => {
    try {
      // console.log('hello');
        // Extract necessary details from the request body (adjust as needed)
        const { mobile, email, productname, amount } = req.body;
        //const formData = req.body.formData; // Get form data from the request
    const orderId = req.body.orderId;
    // console.log(orderId);
    const name =req.body.name;
    // console.log(name);
    
        // Split product names and quantities based on a separator (assuming the format is "product - quantity")
        const products = productname.split(', '); // Change the separator based on your format

        // Create a new order object with the extracted details
        const newOrder = new Order({
          orderId: orderId,
            name: name,
            contact: mobile,
            email: email,
            productName: productname,
            amount: amount/100,
            purchaseDate: new Date()
        });
        // console.log('hello');

        // Save the order to the database
        await newOrder.save();

        for (const product of products) {
          const [productName, productStock] = product.split(' - '); // Adjust based on your format
          console.log(productName,productStock);

          // Find the product in the database and update its quantity
          const foundProduct = await Product.findOne({ productName: productName });
          if (foundProduct) {
              foundProduct.productStock -= parseInt(productStock); // Reduce the quantity
              await foundProduct.save(); // Save the updated product
          }
      }

        //Clear the user's cart items after successful order creation
        await Cart.deleteMany({ userName: name });

        // Respond with a success message
        res.status(200).json({ success: true, message: 'Order details saved successfully' });
    } catch (error) {
        console.error(error);
        // If there's an error, respond with an error message
        res.status(500).json({ success: false, message: 'Failed to save order details' });
    }
});



module.exports = router;