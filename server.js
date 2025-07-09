const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// Serve static files (html, images, etc.)
app.use(express.static(__dirname));

// API endpoint to list files in the current directory
app.get('/api/files', (req, res) => {
    const dirPath = __dirname;
    fs.readdir(dirPath, { withFileTypes: true }, (err, files) => {
        if (err) return res.status(500).json({ error: 'Unable to read directory' });
        const fileList = files.map(f => ({
            name: f.name,
            isDirectory: f.isDirectory()
        }));
        res.json(fileList);
    });
});

app.listen(PORT, () => {
    console.log(`File browser server running at http://localhost:${PORT}`);
});
