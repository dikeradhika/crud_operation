
const express = require('express');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const app = express();
app.use(express.json());

let users = {};


app.get('/api/users', (req, res) => {
  res.status(200).json(Object.values(users));
});

app.get('/api/users/:userId', (req, res) => {
  const userId = req.params.userId;

  if (!uuidValidate(userId)) {
    res.status(400).json({ error: 'Invalid userId' });
    return;
  }

  const user = users[userId];
  if (!user) {
    res.status(404).json({ error: 'User not found' });
    return;
  }

  res.status(200).json(user);
});

app.post('/api/users', (req, res) => {
  const { username, age, hobbies } = req.body;

  if (!username || !age) {
    res.status(400).json({ error: 'Username and age are required' });
    return;
  }

  const userId = uuidv4();
  
  const newUser = { id: userId, username, age, hobbies: hobbies || [] };

  users[userId] = newUser;

  res.status(201).json(newUser);
});

app.put('/api/users/:userId', (req, res) => {
  const userId = req.params.userId;

  if (!uuidValidate(userId)) {
    res.status(400).json({ error: 'Invalid userId' });
    return;
  }

  const user = users[userId];
  if (!user) {
    res.status(404).json({ error: 'User not found' });
    return;
  }

  const { username, age, hobbies } = req.body;

  if (username) user.username = username;
  if (age) user.age = age;
  if (hobbies) user.hobbies = hobbies;

  res.status(200).json(user);
});

app.delete('/api/users/:userId', (req, res) => {
  const userId = req.params.userId;

  if (!uuidValidate(userId)) {
    res.status(400).json({ error: 'Invalid userId' });
    return;
  }

  if (!users[userId]) {
    res.status(404).json({ error: 'User not found' });
    return;
  }

  delete users[userId];
  res.sendStatus(204);
});

app.use((req, res) => {
  res.status(404).json({ error: 'Resource not found' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


