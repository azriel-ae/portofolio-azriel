const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve everything inside /public as static assets (index.html, style.css, script.js)
app.use(express.static(path.join(__dirname, 'public')));

// Fallback: always send index.html for the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Portfolio Azriel Aurizal Ednisia berjalan di http://localhost:${PORT}`);
});
