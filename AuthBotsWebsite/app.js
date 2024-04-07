const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const routes = require('./routes');
const { pool } = require('./config');
const fs = require('fs').promises;
const path = require('path');

app.use(express.json());

app.use(express.static('public'));

function checkAuth(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, 'seu_segredo_secreto', (err, decoded) => {
      if (err) {
        return res
          .status(403)
          .json({ success: false, message: 'Falha na autenticação do token.' });
      } else {
        req.user = decoded;
        next();
      }
    });
  } else {
    return res
      .status(403)
      .json({ success: false, message: 'Token não fornecido.' });
  }
}

app.get('/painel', (req, res) => {
  res.sendFile(__dirname + '/public/painel.html');
});

app.get('/usuarios', (req, res) => {
  const sql = 'SELECT * FROM license';
  pool.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao executar a consulta:', err);
      res.status(500).send('Erro ao obter os usuários');
      return;
    }
    res.json(results);
  });
});

app.use('/api', routes);

app.get('/read-auth', async (req, res) => {
  try {
    const filePath = path.join(__dirname, 'files', 'auth.js');
    const content = await fs.readFile(filePath, 'utf8');
    res.send(content);
  } catch (error) {
    console.error('Erro ao ler o arquivo main:', error);
    res.status(500).send('Erro interno do servidor');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
