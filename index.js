// server.js

const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser'); // Import cookie-parser
const flash = require('connect-flash');
const session = require('express-session');
const app = express();
const PORT = process.env.PORT || 3000; 
const SESSION_SECRET = 'mysecretkey';
// Use cookie-parser middleware
app.use(cookieParser());
// Load environment variables
dotenv.config({ path: 'config.env' });
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: SESSION_SECRET, resave: false, saveUninitialized: true }));
app.use(flash());

// MongoDB connection
const connectDB = require('./databasecn/connection');

// Access PORT from environment variables or default to 8080

// Log requests
app.use(morgan('tiny'));
app.use(express.json());

// MongoDB connection
connectDB();

const userauthenticationRoutes = require('./routes/userauthenticationRoutes');
const adminauthenticationRoutes = require('./routes/adminauthenticationRoutes');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes=require('./routes/userRoutes')
const paymentRoute = require('./routes/paymentRoute');

app.use('/css', express.static(path.resolve(__dirname, "views/css")));
app.use('/IMG', express.static(path.resolve(__dirname, "views/IMG")));
app.use('/js', express.static(path.resolve(__dirname, "views/js")));
app.use('/admin', express.static(path.resolve(__dirname, "views/admin")));
app.use('/scss', express.static(path.resolve(__dirname, "views/scss")));
app.use('/vendor', express.static(path.resolve(__dirname, "views/vendor")));

app.use('/uploads',express.static('uploads'))

app.set('view engine', 'ejs');

app.use(userauthenticationRoutes); // Mount the authentication routes
app.use(adminauthenticationRoutes);
app.use(adminRoutes);
app.use(userRoutes);
app.use(paymentRoute);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
