const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path'); // Required to serve static files
const connectDB = require('./config/db');  // Import the database connection

// Import routes
const categoryRoutes = require('./routes/categoryRoutes');
const collectionRoutes = require('./routes/collectionRoutes');
const productRoutes = require('./routes/productRoutes');
const collectionProductRoutes = require('./routes/collectionProductRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const videoRoutes = require('./routes/videoRoutes');
const orderRoutes = require('./routes/orders');
// const mediaRoutes = require('./routes/mediaRoutes');
const mediaRoutes = require('./routes/mediaRoutes');
// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API Routes
app.use('/api/categories', categoryRoutes);
app.use('/api/collections', collectionRoutes);
app.use('/api/products', productRoutes);
app.use('/api/collection-products', collectionProductRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api', videoRoutes);
app.use('/api', orderRoutes);
// app.use('/api/media', mediaRoutes);
app.use('/api/media', mediaRoutes);

// Serve static files from the front-end build folder if you have a front-end
app.use(express.static(path.join(__dirname, 'build')));

// Root Route (if there's no front-end or just want to serve a message)
app.get('/', (req, res) => {
    res.send('Welcome to the E-commerce API');
});

// Handle any other routes, and send back the index.html file if serving front-end
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Define port
const PORT = process.env.PORT || 10000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
