const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  const token = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
  return token;
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    throw new Error('Token inválido');
  }
};

module.exports = { generateToken, verifyToken };
