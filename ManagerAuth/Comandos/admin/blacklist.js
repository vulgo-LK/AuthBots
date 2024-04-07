const Discord = require('discord.js');
const mysql = require('mysql2');
const config = require('../../config.json');
const allowedUserID = '748309154635972648';

const pool = mysql.createPool({
  host: config.bancodedados.host,
  user: config.bancodedados.user,
  password: config.bancodedados.password,
  database: config.bancodedados.database,
});

module.exports = {
  name: 'blacklist',
  description: 'Define um usuario na blacklist',
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      name: 'licenca',
      description: 'A licença que será utilizada para a operação.',
      type: Discord.ApplicationCommandOptionType.String,
      required: true,
    },
  ],

  run: async (client, interaction) => {
    if (interaction.user.id !== allowedUserID) {
      interaction.reply({
        content: `Você não possui permissão para utilizar este comando.`,
        ephemeral: true,
      });
      return;
    }
    //if (
    //!interaction.member.permissions.has(
    //Discord.PermissionFlagsBits.Administrator
    //)
    //) {
    //interaction.reply({
    //content: `Você não possui permissão para utilizar este comando.`,
    //ephemeral: true,
    //});
    //return;
    //}

    const licencaArg = interaction.options.getString('licenca');
    const guildId = interaction.guildId;

    pool.query(
      'SELECT discord, servidor FROM license WHERE licenca = ?',
      [licencaArg],
      (err, results) => {
        if (err) {
          console.error(err);
          interaction.reply({
            content: 'Ocorreu um erro ao buscar a licença.',
            ephemeral: true,
          });
          return;
        }

        if (results.length === 0) {
          interaction.reply({
            content: `Licença "${licencaArg}" não encontrada.`,
            ephemeral: true,
          });
          return;
        }

        const { discord, servidor } = results[0];

        if (servidor !== guildId) {
          interaction.reply({
            content:
              'A licença especificada não está associada a este servidor.',
            ephemeral: true,
          });
          return;
        }

        pool.query(
          'UPDATE users SET blacklist = 1 WHERE discord = ?',
          [discord],
          (updateErr, updateResults) => {
            if (updateErr) {
              console.error(updateErr);
              interaction.reply({
                content: 'Ocorreu um erro ao atualizar a coluna blacklist.',
                ephemeral: true,
              });
              return;
            }

            interaction.reply({
              content: `A licença "${licencaArg}" foi marcada como blacklist.`,
              ephemeral: true,
            });
          }
        );
      }
    );
  },
};
