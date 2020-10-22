const Event = require('../../Structures/Event');
const MenuDocsEmbed = require('../../Structures/MenuDocsEmbed');
const { Util: { escapeMarkdown } } = require('discord.js');
const { diffWordsWithSpace } = require('diff');

module.exports = class extends Event {

    async run(old, message) {
        if (!message.guild || old.content === message.content || message.author.bot) return;

        const embed = new MenuDocsEmbed()
            .setColor('0xCC99FF')
            .setAuthor(old.author.tag, this.client.user.displayAvatarURL({ dynamic: true }))
            .setTitle('Отредактированное сообщение')
            .setDescription([
                `**❯ ID:** ${old.id}`,
                `**❯ Канал:** ${old.channel}`,
                `**❯ Автор:** ${old.author.tag} (${old.author.id})`
            ])
            .setURL(old.url)
            .splitFields(diffWordsWithSpace(escapeMarkdown(old.content), escapeMarkdown(message.content))
                .map(result => result.added ? `**${result.value}**` : result.removed ? `~~${result.value}~~` : result.value)
                .join(' '));

        const channel = message.guild.channels.cache.find(ch => ch.name === 'chat-log');
        if (channel) channel.send(embed);
    }

};