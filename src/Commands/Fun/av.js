const { MessageEmbed } = require('discord.js')
const Command = require('../../Structures/Command');
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: '',
            description: 'Отображение аватара пользователя',
            category: 'Развлекательные'
        });
    }
    async run(message, args) {
        let user

        if (message.mentions.users.first()) {
            user = message.mentions.users.first();
        } else if (args[0]) {
            user = message.guild.members.cache.get(args[0]).user;
        } else {
            user = message.author;
        }

        let avatar = user.displayAvatarURL({ size: 4096, dynamic: true });
        message.delete({ timeout: 1 })
        const embed = new MessageEmbed()
            .setTitle(`Аватар пользователя ${user.tag} `)
            .setColor("0xCC99FF")
            .setImage(avatar)

        return message.channel.send(embed);
    }
}