const User = require('../models/User');

exports.getmanageuser = async (req, res) => {
    try {
        const users = await User.find({}, 'username phonenumber email');
        res.render('admin/manageuser', { users });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Error fetching users');
    }
 };
 

// Express route handling deletion of users by ID
exports.deleteUser = async (req, res) => {
  const userId = req.params.userId;
  try {
      
    const deletedUser = await User.findByIdAndDelete(userId);
    if (deletedUser) {
        return res.status(200).send('User deleted successfully');
    } else {
        return res.status(404).send('User not found');
    }// Your logic to delete the user with the provided userId
      // Example: await User.findByIdAndDelete(userId);
     // res.status(200).send('User deleted successfully');
  } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).send('Server error');
  }
};


const Order = require('../models/Order');

exports.gettrackuserhistory = async (req, res) => {
    try {
        // Pipeline to aggregate total amount paid, count of orders, and the most recent date of purchase by each user
        const pipeline = [
            {
                $group: {
                    _id: "$name", // Grouping by name
                    totalAmountPaid: { $sum: "$amount" }, // Calculating total amount paid
                    totalOrders: { $sum: 1 }, // Counting the number of orders
                    latestPurchaseDate: { $max: "$purchaseDate" } // Retrieving the maximum date
                }
            }
        ];

        const userData = await Order.aggregate(pipeline);

        res.render('admin/trackuserhistory', { userData });
    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).send('Error fetching user details');
    }
};

const Feedback = require('../models/feedbackModel')
exports.getuserfeedback = async (req, res) => {
    try {
        const feedback = await Feedback.find({});
        res.render('admin/feedbackhistory', { feedback });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Error fetching users');
    }
 };
 