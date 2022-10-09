const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder().setName("volume").setDescription("Change volume of the current song")
    .addNumberOption((option) => option.setName("amount").setDescription("Choose amount of the volume").setRequired(true)),
    run: async ({ client, interaction }) => {
        const noSongEmbed = new EmbedBuilder()
        .setTitle("Error")
        .setDescription("There are no songs in the queue")

        const amountOfVolume = interaction.options.getNumber("amount")

        const queue = client.player.getQueue(interaction.guildId)

        if (!queue) return await interaction.editReply({ embeds: [noSongEmbed] })

        queue.setVolume(amountOfVolume)
        await interaction.editReply({
            embeds: [
                new EmbedBuilder().setTitle("Changed volume").setDescription(`Changed volume of the song to **${amountOfVolume}**`)
            ]
        })
    }
}