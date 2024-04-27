const Product = require('../models/productModel'); // Import the Product model

exports.getProductByCategory = async (req, res) => {
    try {
      const categoryName = req.query.categoryName; 
      const username = req.session.username;// Get the category name from the query parameter
      
      // Fetch products based on the received category name from the database 
      const products = await Product.find({ categoryName }); // Adjust this query based on your database structure
      // Log the values before rendering the view
      // Render the category page with the fetched products
      res.render('product', { products, username}); // Pass categoryName and products to your category view
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };
