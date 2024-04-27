const mongoose = require('mongoose');
// const cron = require('node-cron');
// const Product = require('../models/productModel'); 

const connectDB = async () => {
    try{
        // mongodb connection string
        const con = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })
        createIndex();

        console.log(`MongoDB connected : ${con.connection.host}`);
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}




// Schedule the job to run every day at midnight
// cron.schedule('0 0 * * *', () => {
//   updateExpiredProducts();
// });
// const updateExpiredProducts = async () => {
//   try {
//     // Find and update products where the expiration has occurred
//     const expiredProducts = await Product.find({ createdAt: { $lt: new Date(Date.now() - 24 * 60 * 60 * 1000) } });
//     for (const product of expiredProducts) {
//       await Product.updateOne({ _id: product._id }, { $set: { productStock: 0 } });
//     }
//     console.log(`${expiredProducts.length} products updated.`);
//   } catch (error) {
//     console.error('Error updating expired products:', error);
//   }
// };


const Order = require('../models/Order'); // Replace with the path to your Order model

async function createIndex() {
    try {
        await Order.collection.createIndex({ purchaseDate: -1 });
        //console.log('Index on purchaseDate created successfully');
    } catch (error) {
        console.error('Error creating index:', error);
    }
}


module.exports = connectDB;