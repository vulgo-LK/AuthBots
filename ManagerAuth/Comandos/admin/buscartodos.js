const Discord = require('discord.js');
const fs = require('fs');
const mysql = require('mysql2');
const config = require('../../config.json');

const pool = mysql.createPool({
  host: config.bancodedados.host,
  user: config.bancodedados.user,
  password: config.bancodedados.password,
  database: config.bancodedados.database,
});

module.exports = {
  name: 'buscartodos',
  description: 'Busca todos os licenças no banco de dados.',
  type: Discord.ApplicationCommandType.ChatInput,

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

    const guildId = interaction.guild.id;

    pool.query(
      'SELECT * FROM license WHERE servidor = ?',
      [guildId],
      (err, results) => {
        if (err) {
          console.error(err);
          interaction.reply({
            content: 'Ocorreu um erro ao buscar as licenças.',
            ephemeral: true,
          });
          return;
        }

        let licenseData = results.map((row) => {
          const activeStatus = row.status === 'ativo' ? 'Ativo' : 'Desativado';
          const planoStatus = row.plano === 'free' ? 'Gratuito' : 'Pago';
          return `[${row.id}] - ${row.licenca} - ${row.discord} - Plano: ${planoStatus} - Status: ${activeStatus}`;
        });

        const filePath = './licencas.txt';

        fs.writeFile(filePath, licenseData.join('\n'), (err) => {
          if (err) {
            console.error(err);
            interaction.reply({
              content: 'Ocorreu um erro ao salvar as licenças em um arquivo.',
              ephemeral: true,
            });
            return;
          }

          interaction.reply({
            content: 'Aqui está o arquivo com todas as licenças:',
            files: [filePath],
            ephemeral: true,
          });
        });
      }
    );
  },
};
