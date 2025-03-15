const Discord = require('discord.js');
const axios = require('axios');
const fs = require('fs');
const config = require('./config.json');

const APIAuth = 'http://SEUIP:8080';
let pago = false;

const client = new Discord.Client({
  intents: [Discord.GatewayIntentBits.Guilds],
});

module.exports = client;

client.on('interactionCreate', (interaction) => {
  if (interaction.type === Discord.InteractionType.ApplicationCommand) {
    const cmd = client.slashCommands.get(interaction.commandName);

    if (!cmd) return interaction.reply(`Error`);

    interaction['member'] = interaction.guild.members.cache.get(
      interaction.user.id
    );

    cmd.run(client, interaction);
  }
});

client.on('ready', () => {
  console.log(`🔥 Estou online em ${client.user.username}!`);
});

client.slashCommands = new Discord.Collection();

require('./handler')(client);

client.login(config.token);

process.on('unhandRejection', (reason, promise) => {
  console.log(`🚫 Erro Detectado:\n\n` + reason, promise);
});
process.on('uncaughtException', (error, origin) => {
  console.log(`🚫 Erro Detectado:\n\n` + error, origin);
});

client.on('ready', async () => {
  async function reVerify() {
    try {
      const licenseData = fs.readFileSync('license.json', 'utf8');
      const licenseObject = JSON.parse(licenseData);

      const licencaDoCara = licenseObject.licenca;

      const response = await axios.get(
        APIAuth + `/consulta/licenca/${licencaDoCara}`
      );

      if (response.data === true) {
        console.log('A licença é válida!');
      } else {
        console.log('A licença não é válida.');
        client.destroy();
      }
    } catch (error) {
      console.error('Erro ao verificar a licença!');
      client.destroy();
    }
  }

  while (true) {
    await reVerify();
    await new Promise((resolve) => setTimeout(resolve, 10 * 60 * 1000));
  }
});

client.on('ready', async () => {
  async function reVerify() {
    try {
      const licenseData = fs.readFileSync('license.json', 'utf8');
      const licenseObject = JSON.parse(licenseData);

      const licencaDoCara = licenseObject.licenca;

      const response = await axios.get(
        APIAuth + `/consulta/plano/${licencaDoCara}`
      );

      if (response.data === true) {
        console.log('Plano free carregado!');
        pago = false;
      } else {
        console.log('Plano pago carregado!');
        pago = true;
        executePago();
      }
    } catch (error) {
      console.error('Erro ao verificar a licença!');
      client.destroy();
    }
  }

  while (true) {
    await reVerify();
    await new Promise((resolve) => setTimeout(resolve, 10 * 60 * 1000));
  }
});

client.on('ready', async () => {
  async function reVerify() {
    try {
      const licenseData = fs.readFileSync('license.json', 'utf8');
      const licenseObject = JSON.parse(licenseData);

      const licencaDoCara = licenseObject.licenca;

      const response = await axios.get(
        APIAuth + `/consulta/status/${licencaDoCara}`
      );

      if (response.data === false) {
        console.log('Seu plano do bot expirou!');
        client.destroy();
      }
    } catch (error) {
      console.error('Erro ao verificar a licença!');
      client.destroy();
    }
  }

  while (true) {
    await reVerify();
    await new Promise((resolve) => setTimeout(resolve, 10 * 60 * 1000));
  }
});

client.on('ready', async () => {
  async function reVerify() {
    try {
      const licenseData = fs.readFileSync('license.json', 'utf8');
      const licenseObject = JSON.parse(licenseData);

      const licencaDoCara = licenseObject.licenca;

      const response = await axios.get(
        APIAuth + `/consulta/blacklist/${licencaDoCara}`
      );

      if (response.data === true) {
        console.log('Você esta na blacklist!');
        client.destroy();
      }
    } catch (error) {
      console.error('Erro ao verificar a licença!');
      client.destroy();
    }
  }

  while (true) {
    await reVerify();
    await new Promise((resolve) => setTimeout(resolve, 10 * 60 * 1000));
  }
});

function executePago() {
  if (pago === true) {
    console.log('pagozin');
  }
}
