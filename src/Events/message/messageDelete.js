const Event = require('../../Structures/Event');
const MenuDocsEmbed = require('../../Structures/MenuDocsEmbed');

module.exports = class extends Event {

        async run(message) {
                if (!message.guild || message.author.bot) return;
                const attachments = message.attachments.size ? message.attachments.map(attachment => attachment.proxyURL) : null;
                const embed = new MenuDocsEmbed()
                    .setColor('0xCC99FF')
                    .setAuthor(message.author.tag, this.client.user.displayAvatarURL({ dynamic: true }))
                    .setTitle('Удаленное сообщение')
                    .setDescription([
                            `**❯ ID:** ${message.id}`,
                            `**❯ Канал:** ${message.channel}`,
                            `**❯ Автор:** ${message.member.displayName}`,
                            `${attachments ? `**❯ Вложения:** ${attachments.join('\n')}` : ''}`
			]);
		if (message.content.length) {
			embed.splitFields(`**❯ Удаленное сообщение:** ${message.content}`);
		}

		const channel = message.guild.channels.cache.find(ch => ch.name === 'chat-log');
		if (channel) channel.send(embed);
	}

};