const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');

app.use(express.json());
app.use('/api', userRoutes);

app.get('/', (req, res) => {
  res.send('Node.js CI/CD App Running 🚀');
});

module.exports = app;

// Start server only if not testing
if (require.main === module) {
  app.listen(3000, () => {
    console.log('Server running on port 3000');
  });
}
