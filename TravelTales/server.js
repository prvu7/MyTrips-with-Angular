const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const path = require('path'); // <-- import corect

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Cale absolută către users.json
const usersPath = path.join(__dirname, 'src', 'app', 'users.json');

// Ruta pentru signup
app.post('/signup', (req, res) => {
  const userData = req.body;

  // Citește datele existente (sau pornește cu un array gol)
  let users = [];
  if (fs.existsSync(usersPath) && fs.readFileSync(usersPath, 'utf8').trim() !== '') {
    users = JSON.parse(fs.readFileSync(usersPath, 'utf8'));
  }

  // Adaugă noul user
  users.push(userData);

  // Salvează înapoi în fișier
  fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));

  res.json({ message: 'User salvat cu succes!' });
});

// Ruta pentru login
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Citește utilizatorii existenți
  let users = [];
  if (fs.existsSync(usersPath) && fs.readFileSync(usersPath, 'utf8').trim() !== '') {
    users = JSON.parse(fs.readFileSync(usersPath, 'utf8'));
  }

  // Caută userul cu email și parolă potrivite
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    res.json({ message: 'Login reușit!', user });
  } else {
    res.status(401).json({ message: 'Email sau parolă incorectă!' });
  }
});

app.listen(PORT, () => {
  console.log(`Serverul rulează pe http://localhost:${PORT}`);
});