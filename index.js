import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get('/signal.json', (req, res) => {
  const data = fs.readFileSync(path.join(__dirname, 'signal.json'), 'utf-8');
  res.setHeader('Content-Type', 'application/json');
  res.send(data);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});