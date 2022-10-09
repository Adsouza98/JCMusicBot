const fetch = require("node-fetch");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder, ChannelType } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("watch2gether")
    .setDescription("Watch YouTube with Friends")
    .addChannelOption((option) =>
        option
            .setName('channel')
            .setDescription('The channel to watch2gether')
            .setRequired(true)
            .addChannelTypes(ChannelType.GuildVoice)
    ),
  run: async ({ client, interaction }) => {
    const voiceChannel = interaction.options.getChannel('channel');
    await fetch(
      `https://discord.com/api/v10/channels/${voiceChannel.id}/invites`,
      {
        method: "POST",
        body: JSON.stringify({
          max_age: 86400,
          max_uses: 0,
          target_application_id: "880218394199220334",  // YouTube Applicaiton ID
          target_type: 2,
          temporary: false,
          validate: null,
        }),
        headers: {
          Authorization: `Bot ${client.token}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((invite) => {
        if (!invite.code)
          console.warn("Your bot lacks permissions to perform that action");
        interaction.editReply({
          embeds: [
            new EmbedBuilder()
              .setTitle("Click on the Link to start the Watch2Gether")
              .setDescription(
                `Click on the Link to start the Watch2Gether:\n> https://discord.com/invite/${invite.code}`
              ),
          ],
        });
      });
  },
};
