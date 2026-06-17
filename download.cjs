const https = require('https');
const fs = require('fs');
https.get('https://solarjuice.com.au/wp-content/uploads/2026/02/wattpilot_flex_alt-600x600.jpg', (res) => res.pipe(fs.createWriteStream('fronius.jpg')));
