const Discord = require('discord.js');
const mysql = require('mysql2');
const config = require('../../config.json');

const pool = mysql.createPool({
  host: config.bancodedados.host,
  user: config.bancodedados.user,
  password: config.bancodedados.password,
  database: config.bancodedados.database,
});

function gerarCodigo() {
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let codigo = '';
  for (let i = 0; i < 15; i++) {
    if (i > 0 && i % 5 === 0) {
      codigo += '-';
    } else {
      codigo += caracteres.charAt(
        Math.floor(Math.random() * caracteres.length)
      );
    }
  }
  return codigo;
}

module.exports = {
  name: 'criar',
  description: 'Cria uma nova licença no banco de dados.',
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      name: 'usuario',
      description: 'Mencione o usuário para o qual a licença será criada.',
      type: Discord.ApplicationCommandOptionType.User,
      required: true,
    },
  ],

  run: async (client, interaction) => {
    if (
      !interaction.member.permissions.has(
        Discord.PermissionFlagsBits.Administrator
      )
    ) {
      interaction.reply({
        content: `Você não possui permissão para utilizar este comando.`,
        ephemeral: true,
      });
      return;
    }

    const usuarioMencionado = interaction.options.getUser('usuario');
    let userID = usuarioMencionado.id;
    const guildID = interaction.guildId;

    let licenca = gerarCodigo();

    pool.query(
      'INSERT INTO license (licenca, discord, servidor) VALUES (?, ?, ?)',
      [licenca, userID, guildID],
      (err, results) => {
        if (err) {
          console.error(err);
          interaction.reply({
            content: 'Ocorreu um erro ao criar a licença.',
            ephemeral: true,
          });
          return;
        }

        pool.query(
          'SELECT * FROM users WHERE discord = ?',
          [userID],
          (err, results) => {
            if (err) {
              console.error(err);
              interaction.reply({
                content:
                  'Ocorreu um erro ao verificar o usuário na tabela users.',
                ephemeral: true,
              });
              return;
            }

            if (results.length === 0) {
              pool.query(
                'INSERT INTO users (discord) VALUES (?)',
                [userID],
                (err, results) => {
                  if (err) {
                    console.error(err);
                    interaction.reply({
                      content:
                        'Ocorreu um erro ao adicionar o usuário à tabela users.',
                      ephemeral: true,
                    });
                    return;
                  }

                  interaction.reply({
                    content: `A licença com o código "${licenca}" foi criada para o usuário ${usuarioMencionado}.`,
                    ephemeral: true,
                  });
                }
              );
            } else {
              interaction.reply({
                content: `A licença com o código "${licenca}" foi criada para o usuário ${usuarioMencionado}.`,
                ephemeral: true,
              });
            }
          }
        );
      }
    );
  },
};
