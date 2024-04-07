const Discord = require('discord.js');
const mysql = require('mysql2');
const config = require('../../config.json');

const pool = mysql.createPool({
  host: config.bancodedados.host,
  user: config.bancodedados.user,
  password: config.bancodedados.password,
  database: config.bancodedados.database,
});

module.exports = {
  name: 'atualizar',
  description: 'Atualiza o usuario de uma licença.',
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      name: 'licenca',
      description: 'A licença a ser atualizada.',
      type: Discord.ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: 'usuario',
      description: 'O novo usuário da licenca.',
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

    let licenca = interaction.options.getString('licenca');
    let novoDiscord = interaction.options.getUser('usuario').id;
    let guildId = interaction.guildId;

    pool.getConnection((err, connection) => {
      if (err) {
        console.error(err);
        interaction.reply({
          content: 'Ocorreu um erro ao conectar ao banco de dados.',
          ephemeral: true,
        });
        return;
      }

      connection.beginTransaction((err) => {
        if (err) {
          console.error(err);
          connection.release();
          interaction.reply({
            content:
              'Ocorreu um erro ao iniciar a transação no banco de dados.',
            ephemeral: true,
          });
          return;
        }

        connection.query(
          'SELECT * FROM license WHERE licenca = ? AND servidor = ?',
          [licenca, guildId],
          (err, results) => {
            if (err) {
              console.error(err);
              connection.rollback(() => {
                connection.release();
                interaction.reply({
                  content:
                    'Ocorreu um erro ao verificar a associação da licença ao servidor.',
                  ephemeral: true,
                });
              });
              return;
            }

            if (results.length === 0) {
              connection.rollback(() => {
                connection.release();
                interaction.reply({
                  content:
                    'A licença especificada não está associada a este servidor.',
                  ephemeral: true,
                });
              });
              return;
            }

            connection.query(
              'SELECT * FROM users WHERE discord = ?',
              [novoDiscord],
              (err, results) => {
                if (err) {
                  console.error(err);
                  connection.rollback(() => {
                    connection.release();
                    interaction.reply({
                      content:
                        'Ocorreu um erro ao verificar a existência do usuário.',
                      ephemeral: true,
                    });
                  });
                  return;
                }

                if (results.length > 0) {
                  connection.rollback(() => {
                    connection.release();
                    return;
                  });
                } else {
                  connection.query(
                    'INSERT INTO users (discord) VALUES (?)',
                    [novoDiscord],
                    (err, results) => {
                      if (err) {
                        console.error(err);
                        connection.rollback(() => {
                          connection.release();
                          interaction.reply({
                            content:
                              'Ocorreu um erro ao criar o novo registro na tabela users.',
                            ephemeral: true,
                          });
                        });
                        return;
                      }
                    }
                  );
                }

                connection.query(
                  'UPDATE license SET discord = ? WHERE licenca = ?',
                  [novoDiscord, licenca],
                  (err, results) => {
                    if (err) {
                      console.error(err);
                      connection.rollback(() => {
                        connection.release();
                        interaction.reply({
                          content: 'Ocorreu um erro ao atualizar a licença.',
                          ephemeral: true,
                        });
                      });
                      return;
                    }

                    if (results.affectedRows === 0) {
                      connection.rollback(() => {
                        connection.release();
                        interaction.reply({
                          content: 'A licença especificada não foi encontrada.',
                          ephemeral: true,
                        });
                      });
                      return;
                    }

                    connection.commit((err) => {
                      if (err) {
                        console.error(err);
                        connection.rollback(() => {
                          connection.release();
                          interaction.reply({
                            content:
                              'Ocorreu um erro ao realizar o commit no banco de dados.',
                            ephemeral: true,
                          });
                        });
                        return;
                      }

                      connection.release();
                      interaction.reply({
                        content: `O usuário da licença ${licenca} foi atualizado para: <@${novoDiscord}>`,
                        ephemeral: true,
                      });
                    });
                  }
                );
              }
            );
          }
        );
      });
    });
  },
};
