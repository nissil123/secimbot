const { Discord, EmbedBuilder, ChannelType, ButtonBuilder, ActionRowBuilder, ButtonStyle, ModalBuilder, TextInputStyle, TextInputBuilder, InteractionType, PermissionsBitField, StringSelectMenuBuilder, SlashCommandBuilder, Collection, ContextMenuCommandBuilder } = require ("discord.js")
const icooldown = new Collection()
const { sahipid } = require("../ayarlar.json")

module.exports = {
    name: 'interactionCreate',
    execute(interaction, client) {
      
    const command = client.slashcommands.get(interaction.commandName)
    if(!command) return
      
    try {
      command.execute(client, interaction)
    } catch (error) {
      console.error(error)
    }
  }
}