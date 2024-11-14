const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

dotenv.config();
connectDB();

// Use CORS middleware
app.use(cors()); // Enable CORS for all origins 

// const corsOptions = {
//     origin: 'http://localhost:5173', // Only allow requests from this origin
//   };
//   app.use(cors(corsOptions));

app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
