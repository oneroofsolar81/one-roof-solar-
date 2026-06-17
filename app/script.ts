import https from 'https';

https.get('https://streamable.com/2778ie', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    const match = data.match(/<meta property="og:video:url" content="([^"]+)"/);
    if (match) {
      console.log('Video URL:', match[1]);
    } else {
      console.log('No video URL found');
    }
  });
}).on('error', (err) => {
  console.log('Error: ' + err.message);
});
