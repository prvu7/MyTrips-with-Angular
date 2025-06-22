const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const path = require('path'); 

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Cale absolută către users.json
const usersPath = path.join(__dirname, 'src', 'assets', 'users.json');

// Ruta pentru signup
app.post('/signup', (req, res) => {
  const userData = req.body;

  // Citește datele existente (sau pornește cu un array gol)
  let users = [];
  if (fs.existsSync(usersPath) && fs.readFileSync(usersPath, 'utf8').trim() !== '') {
    users = JSON.parse(fs.readFileSync(usersPath, 'utf8'));
  }

    // Verifică dacă emailul există deja
  const emailExists = users.some(user => user.email === userData.email);
  if (emailExists) {
    return res.status(409).json({ message: 'Un cont cu acest email există deja.' });
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

  // Caută userul DOAR după email
  const user = users.find(u => u.email === email);

  // Verificare 1: Emailul nu a fost găsit
  if (!user) {
    return res.status(404).json({ message: 'Emailul nu este înregistrat.' });
  }

  // Verificare 2: Parola este greșită
  if (user.password !== password) {
    return res.status(401).json({ message: 'Parolă incorectă.' });
  }

  // Succes: Email și parolă corecte
  res.json({ message: 'Login reușit!', user });
});


// ----- TRIPS -----
const tripsPath = path.join(__dirname, 'src', 'assets', 'data', 'trips.json');

// GET toate calatoriile
app.get('/trips', (req, res) => {
  try {
    let trips = [];
    if (fs.existsSync(tripsPath) && fs.readFileSync(tripsPath, 'utf8').trim() !== '') {
      trips = JSON.parse(fs.readFileSync(tripsPath, 'utf8'));
    }
    res.json(trips);
  } catch (error) {
    res.status(500).json({ message: 'Eroare la citirea călătoriilor!' });
  }
});

// POST o noua calatorie
app.post('/trips', (req, res) => {
  console.log('--- Received POST request for /trips ---');
  try {
    const tripData = req.body;
    console.log('Request body:', tripData);

    let trips = [];
    if (fs.existsSync(tripsPath) && fs.readFileSync(tripsPath, 'utf8').trim() !== '') {
      console.log('Reading existing trips.json...');
      trips = JSON.parse(fs.readFileSync(tripsPath, 'utf8'));
      console.log('Successfully parsed trips.json.');
    } else {
      console.log('trips.json is empty or does not exist. Starting with an empty array.');
    }

    trips.unshift(tripData);
    console.log('New trip added to the array.');

    fs.writeFileSync(tripsPath, JSON.stringify(trips, null, 2));
    console.log('Successfully wrote back to trips.json.');

    res.json({ message: 'Călătorie salvată cu succes!', trips });
    console.log('--- Successfully processed POST request for /trips ---');
  } catch (error) {
    console.error('!!! ERROR in POST /trips:', error); // Log detaliat al erorii
    res.status(500).json({ message: 'Eroare la salvarea călătoriei!' });
  }
});

// Actualizeaza o calatorie
app.put('/trips/:index', (req, res) => {
  try {
    const index = parseInt(req.params.index);
    const tripData = req.body;

    let trips = [];
    if (fs.existsSync(tripsPath) && fs.readFileSync(tripsPath, 'utf8').trim() !== '') {
      trips = JSON.parse(fs.readFileSync(tripsPath, 'utf8'));
    }

    if (index >= 0 && index < trips.length) {
      trips[index] = tripData;
      
      fs.writeFileSync(tripsPath, JSON.stringify(trips, null, 2));
      
      res.json({ message: 'Călătorie actualizată cu succes!', trips });
    } else {
      res.status(404).json({ message: 'Călătoria nu a fost găsită!' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Eroare la actualizarea călătoriei!' });
  }
});

// Sterge o calatorie
app.delete('/trips/:index', (req, res) => {
  try {
    const index = parseInt(req.params.index);

    let trips = [];
    if (fs.existsSync(tripsPath) && fs.readFileSync(tripsPath, 'utf8').trim() !== '') {
      trips = JSON.parse(fs.readFileSync(tripsPath, 'utf8'));
    }

    if (index >= 0 && index < trips.length) {
      trips.splice(index, 1);
      
      fs.writeFileSync(tripsPath, JSON.stringify(trips, null, 2));
      
      res.json({ message: 'Călătorie ștearsă cu succes!', trips });
    } else {
      res.status(404).json({ message: 'Călătoria nu a fost găsită!' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Eroare la ștergerea călătoriei!' });
  }
});

app.listen(PORT, () => {
  console.log(`Serverul rulează pe http://localhost:${PORT}`);
});