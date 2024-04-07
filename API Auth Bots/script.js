const express = require('express');
const mysql = require('mysql2/promise');

const app = express();

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'authbots',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// --------------------------------------------------------------- //
//                      CONSULTA INFO LICENCA                      //
// --------------------------------------------------------------- //

app.get('/consulta/:licenca', async (req, res) => {
  const { licenca } = req.params;

  try {
    const connection = await pool.getConnection();
    const [rows, fields] = await connection.execute(
      'SELECT * FROM license WHERE licenca = ?',
      [licenca]
    );

    connection.release();
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// --------------------------------------------------------------- //
//                       CONSULTA LICENCA                          //
// --------------------------------------------------------------- //

app.get('/consulta/licenca/:licenca', async (req, res) => {
  const { licenca } = req.params;

  try {
    const connection = await pool.getConnection();
    const [rows, fields] = await connection.execute(
      'SELECT licenca FROM license WHERE licenca = ?',
      [licenca]
    );

    connection.release();

    const licencaValue = rows[0]?.licenca || null;

    if (licencaValue) {
      res.send('true');
    } else {
      res.status(404).send('false');
    }
  } catch (error) {
    res.status(500).send('Erro interno do servidor');
  }
});

// --------------------------------------------------------------- //
//                      CONSULTA BLACKLIST                         //
// --------------------------------------------------------------- //

app.get('/consulta/blacklist/:licenca', async (req, res) => {
  const { licenca } = req.params;

  try {
    const connection = await pool.getConnection();

    const [rows, fields] = await connection.execute(
      'SELECT licenca, discord FROM license WHERE licenca = ?',
      [licenca]
    );

    const licencaValue = rows[0]?.licenca || null;
    const discordID = rows[0]?.discord || null;

    if (!licencaValue) {
      connection.release();
      res.status(404).send('Licença não encontrada');
      return;
    }

    const [userRows, userFields] = await connection.execute(
      'SELECT blacklist FROM users WHERE discord = ?',
      [discordID]
    );

    const blacklistValue = userRows[0]?.blacklist || null;

    connection.release();

    if (blacklistValue === 1) {
      res.send('true');
    } else {
      res.send('false');
    }
  } catch (error) {
    res.status(500).send('Erro interno do servidor');
  }
});

// --------------------------------------------------------------- //
//                      CONSULTA STATUS                            //
// --------------------------------------------------------------- //

app.get('/consulta/status/:licenca', async (req, res) => {
  const { licenca } = req.params;

  try {
    const connection = await pool.getConnection();

    const [rows, fields] = await connection.execute(
      'SELECT licenca, status FROM license WHERE licenca = ?',
      [licenca]
    );

    const licencaValue = rows[0]?.licenca || null;

    if (!licencaValue) {
      connection.release();
      res.status(404).send('Licença não encontrada');
      return;
    }

    const statusValue = rows[0]?.status || null;

    connection.release();

    if (statusValue === 'ativo') {
      res.send('true');
    } else {
      res.send('false');
    }
  } catch (error) {
    res.status(500).send('Erro interno do servidor');
  }
});

// --------------------------------------------------------------- //
//                      CONSULTA STATUS                            //
// --------------------------------------------------------------- //

app.get('/consulta/plano/:licenca', async (req, res) => {
  const { licenca } = req.params;

  try {
    const connection = await pool.getConnection();

    const [rows, fields] = await connection.execute(
      'SELECT licenca, plano FROM license WHERE licenca = ?',
      [licenca]
    );

    const licencaValue = rows[0]?.licenca || null;

    if (!licencaValue) {
      connection.release();
      res.status(404).send('Licença não encontrada');
      return;
    }

    const statusValue = rows[0]?.plano || null;

    connection.release();

    if (statusValue === 'free') {
      res.send('true');
    } else {
      res.send('false');
    }
  } catch (error) {
    res.status(500).send('Erro interno do servidor');
  }
});

const PORT = process.env.PORT || 30120;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
