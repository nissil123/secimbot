const { ActivityType, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js")
require('advanced-logs')

module.exports = {
  name: 'ready',
  execute(client) {
    console.success(`aktifim ab `, ` `)
    client.user.setPresence({
      activities: [
        {
          name: `nissil kodluyo`,
          type: ActivityType.Playing
        }
      ]
    })
    client.user.setStatus(`idle`)
  }
}