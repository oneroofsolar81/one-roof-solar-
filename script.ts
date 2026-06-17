import fs from "fs";

const path = "src/pages/admin/AdminDashboard.tsx";
let code = fs.readFileSync(path, 'utf8');
code = code.replace(/description": /g, 'description: ');
fs.writeFileSync(path, code);
