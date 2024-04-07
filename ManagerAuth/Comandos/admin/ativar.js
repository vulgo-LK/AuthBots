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
  name: 'ativar',
  description: 'Ativa um licença no banco de dados.',
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      name: 'licenca',
      description: 'A licença a ser ativada.',
      type: Discord.ApplicationCommandOptionType.String,
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
    const guildId = interaction.guildId;

    pool.query(
      'SELECT * FROM license WHERE licenca = ? AND servidor = ?',
      [licenca, guildId],
      (err, results) => {
        if (err) {
          console.error(err);
          interaction.reply({
            content: 'Ocorreu um erro ao ativar a licença.',
            ephemeral: true,
          });
          return;
        }

        if (results.length === 0) {
          interaction.reply({
            content:
              'A licença especificada não está associada a este servidor.',
            ephemeral: true,
          });
          return;
        }

        pool.query(
          'UPDATE license SET status = ? WHERE licenca = ? AND servidor = ?',
          ['ativo', licenca, guildId],
          (err, results) => {
            if (err) {
              console.error(err);
              interaction.reply({
                content: 'Ocorreu um erro ao ativar a licença.',
                ephemeral: true,
              });
              return;
            }

            interaction.reply({
              content: `A licença ${licenca} foi ativada.`,
              ephemeral: true,
            });
          }
        );
      }
    );
  },
};
