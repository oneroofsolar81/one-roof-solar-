import fs from 'fs';

const files = [
  'index.html',
  'src/pages/admin/AdminDashboard.tsx',
  'src/pages/admin/AdminLogin.tsx',
  'src/pages/admin/AdminLayout.tsx',
  'src/pages/Projects.tsx',
  'src/pages/ServiceDetail.tsx',
  'src/pages/About.tsx',
  'src/pages/Contact.tsx',
  'src/pages/Home.tsx',
  'src/components/Navbar.tsx',
  'src/components/Footer.tsx',
  'metadata.json',
  'home_data.json'
];

for (const file of files) {
  try {
    let content = fs.readFileSync(file, 'utf8');
    let newContent = content.replace(/OneRoof/g, 'Oneroof');
    newContent = newContent.replace(/One Roof/g, 'Oneroof');
    if (content !== newContent) {
      fs.writeFileSync(file, newContent);
      console.log('Updated ' + file);
    }
  } catch (e) {
    console.error('Error on ' + file + ': ' + e.message);
  }
}
