const { MessageEmbed } = require('discord.js');
const Command = require('../../Structures/Command');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: '',
            description: '',
            category: 'Информационные'
        });
    }

    async run(message, [command]) {
        const embed = new MessageEmbed()
            .setTitle('📋 **Команды**')
            .setColor('BLUE')
            .setTimestamp();

        if (command) {
            const cmd = this.client.commands.get(command) || this.client.commands.get(this.client.aliases.get(command));
            message.delete({ timeout: 1 })
            if (!cmd) return message.channel.send(`Команда не найдена \`${command}\``);

            embed.setDescription([
                `**❯ Описание:** ${cmd.description}`,
                `**❯ Категория:** ${cmd.category}`,
                `**❯ Использование:** ${cmd.usage}`
            ]);
            return message.channel.send(embed);
        } else {
            embed.setDescription([]);
            let categories;
            if (!this.client.owners.includes(message.author.id)) {
                categories = this.client.utils.removeDuplicates(this.client.commands.filter(cmd => cmd.category !== 'Владелец').map(cmd => cmd.category));
            } else {
                categories = this.client.utils.removeDuplicates(this.client.commands.map(cmd => cmd.category));
            }

            for (const category of categories) {
                embed.addField(`**${this.client.utils.capitalise(category)}**`, this.client.commands.filter(cmd =>
                    cmd.category === category).map(cmd => `/${cmd.name}`).join(' '));
            }
            message.delete({ timeout: 1 })
            return message.channel.send(embed);
        }
    }

};