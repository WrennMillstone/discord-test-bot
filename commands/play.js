const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Plays the provided youtube video in your current voice channel!')
    .addStringOption(option => 
      option.setName('url')
        .setDescription('the url of the video to play')
        .setRequired(true)),
  async execute(interaction) {
    const url = interaction.options.getString('url');

    const ytdl = require('ytdl-core');

    const {
      AudioPlayerStatus,
      StreamType,
      createAudioPlayer,
      createAudioResource,
      joinVoiceChannel,
    } = require('@discordjs/voice');

    // ...

    const { voiceChannel } = interaction.user;

    if (!voiceChannel) {
        return interaction.reply('please join a voice channel first!');
    }

    const connection = joinVoiceChannel({
      channelId: voiceChannel.id,
      guildId: guild.id,
      adapterCreator: guild.voiceAdapterCreator,
    });

    

    const stream = ytdl({url}, { filter: 'audioonly' });
    const resource = createAudioResource(stream, { inputType: StreamType.Arbitrary });
    const player = createAudioPlayer();

    player.play(resource);
    connection.subscribe(player);

    player.on(AudioPlayerStatus.Idle, () => connection.destroy());

  }
};