const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('echo')
    .setDescription('Echos a message back to you!')
    .addStringOption(option => 
      option.setName('input')
        .setDescription('the input to echo back')
        .setRequired(true)),
  async execute(interaction) {
    const input = interaction.options.getString('input')
    await interaction.reply(input);
  }
};