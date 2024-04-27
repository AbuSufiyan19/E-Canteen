const User = require('../models/User');

exports.getmyprofilepage = async (req, res) => {
    const username = req.session.username;
    try {
        const user = await User.findOne({ username: username });
        console.log(user);

        res.render('userprofile', { user , username });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).send('Error fetching user');
    }
};


exports.updatemyprofilepage = async (req, res) => {
    const userId = req.params.userId; // Extract productId from the request parameters
      
    try {
        // Find the product by its ID in the database
        const userToUpdate = await User.findByIdAndUpdate(userId, {
            // Update the fields you want to change
            email: req.body.email,
            phonenumber: req.body.phonenumber
            // Add more fields as needed
        }, { new: true }); // To get the updated product
  
        if (!userToUpdate) {
            return res.status(404).json({ message: 'user not found' });
        }
  
        // Respond with the updated product
        res.status(200).json({ message: 'user updated successfully', updatedUser: userToUpdate });
    } catch (error) {
        // Handle errors and respond with an error message
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Failed to update user' });
    }
  };
  
