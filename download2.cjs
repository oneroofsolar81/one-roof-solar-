const https = require('https');
const fs = require('fs');

https.get('https://evse.com.au/wp-content/uploads/Wattpilot-Go-22-J-2.0-AUS-bundle.jpg', (res) => {
  res.pipe(fs.createWriteStream('fronius2.jpg'));
});
