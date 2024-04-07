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
  name: 'mudarplano',
  description: 'Muda o plano de uma licença.',
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      name: 'licenca',
      description: 'A licença a ser modificada.',
      type: Discord.ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: 'tipo',
      description: 'O novo tipo de plano (free ou pago).',
      type: Discord.ApplicationCommandOptionType.String,
      required: true,
      choices: [
        { name: 'Free', value: 'free' },
        { name: 'Pago', value: 'pago' },
      ],
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
    const tipo = interaction.options.getString('tipo');
    const free = tipo === 'free' ? 'free' : 'pago';
    const guildId = interaction.guildId; // Obtém o ID da guild

    pool.query(
      'SELECT * FROM license WHERE licenca = ? AND servidor = ?',
      [licenca, guildId],
      (err, results) => {
        if (err) {
          console.error(err);
          interaction.reply({
            content: 'Ocorreu um erro ao consultar a licença.',
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

        let licencaAtual = results[0].plano === 'free' ? 'free' : 'pago';

        if (licencaAtual === tipo) {
          interaction.reply({
            content: `A licença com o código "${licenca}" já está com o plano ${tipo}.`,
            ephemeral: true,
          });
          return;
        }

        pool.query(
          'UPDATE license SET plano = ? WHERE licenca = ?',
          [free, licenca],
          (err, results) => {
            if (err) {
              console.error(err);
              interaction.reply({
                content: 'Ocorreu um erro ao modificar o plano da licença.',
                ephemeral: true,
              });
              return;
            }

            interaction.reply({
              content: `O plano da licença com o código "${licenca}" foi alterado para ${tipo}.`,
              ephemeral: true,
            });
          }
        );
      }
    );
  },
};
