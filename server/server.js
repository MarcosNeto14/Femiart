const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());
app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/marketplace')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const User = mongoose.model('User', UserSchema);

app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashedPassword });
  await user.save();
  res.status(201).send('User created');
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).send('Invalid email or password');

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return res.status(400).send('Invalid email or password');

  const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
  res.send({ token });
});

app.post('/reset-password', async (req, res) => {
  const { email, newPassword } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).send('User not found');

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await User.findByIdAndUpdate(user._id, { password: hashedPassword });
  res.send('Password updated');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
