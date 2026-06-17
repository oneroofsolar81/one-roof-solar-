import fs from 'fs';

async function checkUrl(url) {
  try {
    const res = await fetch(url, { method: 'HEAD' });
    console.log(`${res.status} ${url}`);
  } catch (e) {
    console.log(`ERR ${url} ${e.message}`);
  }
}

const data = `https://orangesolarsystems.co.uk/wp-content/uploads/2024/11/Tesla-Powerwall-2-installation-Haslemere-1-1024x768.jpg
https://5.imimg.com/data5/SELLER/Default/2025/10/554370004/FM/TJ/DL/23068426/grid-tied-solar-system.jpeg
https://a-us.storyblok.com/f/1006159/810x471/2ddba951c6/string-inverters.jpg/m/1000x0/filters:quality(60):format(webp)
https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=60&w=1000&auto=format&fit=crop
https://a-us.storyblok.com/f/1006159/810x471/62865d0b80/des-1116-csm.jpg/m/1000x0/filters:quality(60):format(webp)
https://solarjuice.com.au/wp-content/uploads/2026/05/Powerwall-and-Backup-Gateway-2-copy-1280x720-Edited-Edited-600x618.png
https://solarjuice.com.au/wp-content/uploads/2026/05/ECS.1-406.png
https://www.goodwe.com.au/Public/Uploads/uploadfile4/images/20251014/ESA3-10KAll-in-oneSystem-1-495.png`;

async function run() {
  const urls = data.split('\n').filter(Boolean);
  for (const url of urls) {
    await checkUrl(url);
  }
}

run();
