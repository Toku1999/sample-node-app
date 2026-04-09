const express = require('express');
const app = express();

app.use(express.json());

// Root route
app.get('/', (req, res) => {
    res.send('CI/CD App Running 🚀');
});

// Health check (important for monitoring)
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'UP' });
});

// Sample API
app.get('/api/users', (req, res) => {
    res.json([
        { id: 1, name: "Tokesh" },
        { id: 2, name: "DevOps Engineer" }
    ]);
});

const PORT = 3000;

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;
