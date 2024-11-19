const express = require('express');
const fs = require('fs');
const path = require('path'); // Add this line
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware (optional)
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

app.use(express.static(__dirname));  // Serve static files first

// Basic route
app.get('/', (req, res) => {
    res.send('Request something!!');
});

// Endpoint to serve specific GeoJSON files
app.get('/geojson/:name', (req, res) => {
    const geojsonFileName = req.params.name; // Get the filename from the URL
    const geojsonFilePath = path.join(__dirname, 'GeoJson', `${geojsonFileName}.geojson`);

    // Read the GeoJSON file and send its content
    fs.readFile(geojsonFilePath, 'utf8', (err, data) => {
        if (err) {
            res.status(404).send('GeoJSON file not found');
            return;
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(data); // send the content of the GeoJSON file
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
