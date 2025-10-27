const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const { getPool } = require('./config/database');

// Import routes
const landRoutes = require('./routes/land.routes');
const buildingRoutes = require('./routes/building.routes');
const rentalRoutes = require('./routes/rental.routes');
const schoolMapRoutes = require('./routes/school-map.routes');
const displacementRoutes = require('./routes/displacement.routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Routes
app.use('/api/lands', landRoutes);
app.use('/api/buildings', buildingRoutes);
app.use('/api/rentals', rentalRoutes);
app.use('/api/school-maps', schoolMapRoutes);
app.use('/api/displacements', displacementRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error',
      status: err.status || 500
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: {
      message: 'Route not found',
      status: 404
    }
  });
});

// Initialize database connection and start server
getPool()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV}`);
      console.log(`API available at http://localhost:${PORT}/api`);
    });
  })
  .catch(err => {
    console.error('Failed to start server:', err);
    process.exit(1);
  });

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM signal received: closing HTTP server');
  const { closePool } = require('./config/database');
  await closePool();
  process.exit(0);
});

module.exports = app;
