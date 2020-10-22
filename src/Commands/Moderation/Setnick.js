const Command = require('../../Structures/Command');
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: '',
            description: 'Изменение никнейма',
            category: 'Модерация'
        });
    }
    async run(message, args) {
        if (!message.member.hasPermission(["MANAGE_GUILD", "ADMINISTRATOR"])) {
            return message.channel.send({ embed: { color: "RED", title: "❌ Уведомление", description: "**Вы не можете использовать эту команду!**" } })
        }

        let user = message.mentions.users.first(); // You can mention someone, not only just user.
        if (!user) return message.channel.send({ embed: { color: "RED", title: "❌ Уведомление", description: "**Вы должны упомянуть пользователя!**" } });

        let nick = args.slice(1).join(" ");
        if (!nick) return message.channel.send({ embed: { color: "RED", title: "❌ Уведомление", description: "**Вам нужно ввести никнейм на который будете изменять!**" } });

        let member = message.guild.members.cache.get(user.id);
        message.delete({ timeout: 1 })

        await member.setNickname(nick).catch(err => message.channel.send({ embed: { color: "RED", description: `Error: ${err}` } }));
        return message.channel.send({ embed: { color: "0xCC99FF", title: "🔔 Уведомление", description: `Старший модератор ${message.author} изменил никнейм **${user.tag}** на **${nick}**` } });
    }
}