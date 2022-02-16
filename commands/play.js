const { SlashCommandBuilder } = require('@discordjs/builders');
const ytdl = require('ytdl-core');
const {
  AudioPlayerStatus,
  StreamType,
  createAudioPlayer,
  createAudioResource,
  joinVoiceChannel,
} = require('@discordjs/voice');
const { Guild } = require('discord.js');



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
    const user = await interaction.member.fetch();
    const channel = await user.voice.channel;


    if (!channel) {
      interaction.reply('you are not in a voice channel');
    }

    const connection = joinVoiceChannel({
      channelId: channel,
      guildId: interaction.guildId,
      adapterCreator: Guild.voiceAdapterCreator,
    });

    

    const stream = ytdl(url, { filter: 'audioonly' });
    const resource = createAudioResource(stream, { inputType: StreamType.Arbitrary });
    const player = createAudioPlayer();

    player.play(resource);
    connection.subscribe(player);

    player.on(AudioPlayerStatus.Idle, () => connection.destroy());

  }
};