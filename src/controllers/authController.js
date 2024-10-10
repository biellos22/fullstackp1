const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/dbConfig').connectMySQL();

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const [existingUser] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
  if (existingUser.length > 0) {
    return res.status(400).json({ message: 'Usuário já cadastrado.' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.execute('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword]);
  res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const [user] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
  if (user.length === 0) {
    return res.status(400).json({ message: 'Credenciais inválidas.' });
  }

  const isMatch = await bcrypt.compare(password, user[0].password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Credenciais inválidas.' });
  }

  const token = jwt.sign({ userId: user[0].id, email: user[0].email }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
};

module.exports = { register, login };
