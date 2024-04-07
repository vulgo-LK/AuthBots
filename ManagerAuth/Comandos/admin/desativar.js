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
  name: 'desativar',
  description: 'Desativa um licença no banco de dados.',
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      name: 'licenca',
      description: 'A licença a ser desativada.',
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

    const licenca = interaction.options.getString('licenca');
    const guildId = interaction.guildId; // Obtém o ID da guild

    pool.query(
      'SELECT servidor FROM license WHERE licenca = ?',
      [licenca],
      (selectErr, selectResults) => {
        if (selectErr) {
          console.error(selectErr);
          interaction.reply({
            content: 'Ocorreu um erro ao buscar a licença.',
            ephemeral: true,
          });
          return;
        }

        if (
          selectResults.length === 0 ||
          selectResults[0].servidor !== guildId
        ) {
          interaction.reply({
            content:
              'A licença especificada não está associada a este servidor.',
            ephemeral: true,
          });
          return;
        }

        pool.query(
          'UPDATE license SET status = ? WHERE licenca = ?',
          ['desativado', licenca],
          (updateErr, updateResults) => {
            if (updateErr) {
              console.error(updateErr);
              interaction.reply({
                content: 'Ocorreu um erro ao desativar a licença.',
                ephemeral: true,
              });
              return;
            }

            interaction.reply({
              content: `A licença ${licenca} foi desativada.`,
              ephemeral: true,
            });
          }
        );
      }
    );
  },
};
