const { Discord, EmbedBuilder, ChannelType, ButtonBuilder, ActionRowBuilder, ButtonStyle, ModalBuilder, TextInputStyle, TextInputBuilder, InteractionType, PermissionsBitField, StringSelectMenuBuilder, SlashCommandBuilder, ContextMenuCommandBuilder, ApplicationCommandType } = require ("discord.js")
const { JsonDatabase } = require("wio.db")

module.exports = {
  slash: true,
  data: new SlashCommandBuilder()    
    .setName('oy-ver')
    .setDescription('Seçim için oy verirsiniz.')
    .setDMPermission(false)
    .addStringOption(option =>
      option
        .setName('aday')
        .setDescription('Oy vereceğiniz adayı seçin.')
        .setRequired(true)
        .addChoices(
          {
            name: `Recep Tayyip ERDOĞAN`,
            value: `Recep Tayyip ERDOĞAN`
          },
          {
            name: `Kemal KILIÇDAROĞLU`,
            value: `Kemal KILIÇDAROĞLU`
          },
          {
            name: `Sinan OĞAN`,
            value: `Sinan OĞAN`
          })),
  
async execute(client, interaction) { 

  await interaction.deferReply({ephemeral: true})
  const db = new JsonDatabase({databasePath: `./Database/Database.json`})
  const Aday = interaction.options.getString('aday')
  
  if(db.fetch(`Oy_${interaction.user.id}`)) {
    const OyVermişsin = new EmbedBuilder()
      .setColor("Red")
      .setAuthor({name: `${client.user.username} | Oy vermişsin`, iconURL: client.user.avatarURL()}) 
      .setDescription(`> ❌ Zaten oy vermişsin, verdiğin oyu mesaj altındaki buton yardımı ile görüntüleyebilirsin.`)
      .setFooter({text: interaction.user.username, iconURL: interaction.user.avatarURL()})
      .setTimestamp()
    await interaction.followUp({embeds: [OyVermişsin]})
  
  } else {
  
    db.set(`Oy_${interaction.user.id}`, true)
    db.set(`Aday_${interaction.user.id}`, Aday)
    db.add(`OySayısı`, 1)
    db.add(`AdayOy_${Aday}`, 1)
    
    const OyVerdin = new EmbedBuilder()
      .setColor("Green")
      .setAuthor({name: `${client.user.username} | Oy verdin`, iconURL: client.user.avatarURL()}) 
      .setDescription(`> ☑️ Seçim için oyunu **${Aday}** adayına verdin.`)
      .setFooter({text: interaction.user.username, iconURL: interaction.user.avatarURL()})
      .setTimestamp()
    await interaction.followUp({embeds: [OyVerdin]})
   
  }
  
  }
}