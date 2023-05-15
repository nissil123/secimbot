const { Discord, EmbedBuilder, ChannelType, ButtonBuilder, ActionRowBuilder, ButtonStyle, ModalBuilder, TextInputStyle, TextInputBuilder, InteractionType, PermissionsBitField, StringSelectMenuBuilder, SlashCommandBuilder, ContextMenuCommandBuilder, ApplicationCommandType } = require ("discord.js")
const { JsonDatabase } = require("wio.db")

module.exports = {
  slash: true,
  data: new SlashCommandBuilder()    
    .setName('sıralama')
    .setDescription('Seçim oylarını gösterir.')
    .setDMPermission(false),
  
async execute(client, interaction) { 

  await interaction.deferReply({ephemeral: true})
  const db = new JsonDatabase({databasePath: `./Database/SeçimBot.json`})
  if(interaction.user.id !== "KENDI ID NIZ") return

  const Embed = new EmbedBuilder()
    .setColor("Blurple")
    .setAuthor({name: `${client.user.username} | Oy sıralaması`, iconURL: client.user.avatarURL()}) 
    .setDescription(`> İşte verilen oyların sıralaması.\n\n> **Recep Tayyip ERDOĞAN:** ${db.fetch(`AdayOy_Recep Tayyip ERDOĞAN`) || 0} Oy\n> **Kemal KILIÇDAROĞLU:** ${db.fetch(`AdayOy_Kemal KILIÇDAROĞLU`) || 0} Oy \n> **Muharrem İNCE:** ${db.fetch(`AdayOy_Muharrem İNCE`) || 0} Oy\n> **Sinan OĞAN:** ${db.fetch(`AdayOy_Sinan OĞAN`) || 0} Oy`)
    .setFooter({text: interaction.user.username, iconURL: interaction.user.avatarURL()})
    .setTimestamp()
  await interaction.followUp({embeds: [Embed]})
  
  
  }
}