module.exports =  {
	name: 'interactionCreate',
	async execute(interaction) {
		console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction(${interaction.commandName}).`);

    if (!interaction.isCommand()) {
      console.log('interaction not a command')
      return;
    }

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
      console.log('interaction not on command list')
      return;
    }

    try {
      await command.execute(interaction);
      console.log('command success');
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
      console.log('command failure')
    }
	},
};