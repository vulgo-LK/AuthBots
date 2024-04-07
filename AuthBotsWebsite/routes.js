const express = require('express');
const router = express.Router();
const pool = require('./config');
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const [rows, fields] = await pool.execute(
      'SELECT * FROM usuarios WHERE username = ? AND password = ?',
      [username, password]
    );

    if (rows.length > 0) {
      const token = jwt.sign({ username: username }, 'seu_segredo_secreto', {
        expiresIn: '1h',
      });
      res.json({ success: true, token: token });
    } else {
      res.json({ success: false, message: 'Credenciais inválidas' });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: 'Erro interno do servidor' });
  }
});

module.exports = router;
