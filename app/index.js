const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Health check route
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Login page
app.get('/', (req, res) => {
  res.send(`
    <h2>Demo Login</h2>
    <form method="POST" action="/login">
      <input type="text" name="email" placeholder="Email" required />
      <input type="password" name="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  `);
});

// Handle login POST request
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if(email === 'hire-me@anshumat.org' && password === 'HireMe@2025!') {
    res.send('<h3 style="color:green;">Login Successful! ✅</h3>');
  } else {
    res.send('<h3 style="color:red;">Invalid Email or Password ❌</h3>');
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on 0.0.0.0:${port}`);
});
