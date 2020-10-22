const { MessageEmbed } = require('discord.js')
const Command = require('../../Structures/Command');
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: '',
            description: 'удаление модератору роли ',
            category: 'Модерация'
        });
    }
    async run(message, args) {
        if (!message.member.permissions.has("ADMINISTRATOR"))
            return message.channel.send({ embed: { color: "RED", title: "❌ Уведомление", description: "**Вы не можете использовать эту команду!**" } })

        let role = message.guild.roles.cache.find(r => r.name === "Friend");

        // Let's pretend you mentioned the user you want to add a role to (!addrole @user Role Name):
        let user = message.mentions.users.first(); // You can mention someone, not only just user.
        if (!user) return message.channel.send({ embed: { color: "RED", title: "❌ Уведомление", description: "**Вы должны упомянуть пользователя!**" } });

        let member = message.guild.members.cache.get(user.id);

        message.delete({ timeout: 1 })


        member.roles.add('754421355965054981')
        member.roles.add('754432589619789905')

        const embed = new MessageEmbed()
            .setTitle(`🔔 Уведомление`)
            .setDescription(`**Приветствуем нового модератора ${member} в рядах сервера Industrial!**`)
            .setColor("BLUE")

        return message.channel.send(embed);

    }
}