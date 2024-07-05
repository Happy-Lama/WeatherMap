const express = require('express');
const path = require('path');
const morgan = require('morgan')
const app = express();
const readJSONFile = require('./readJSONFile')

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'demo')));
app.use(morgan('dev'))

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
