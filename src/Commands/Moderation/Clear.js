const { MessageEmbed } = require('discord.js')
const Command = require('../../Structures/Command');
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: '',
            description: 'Удаление сообщений',
            category: 'Модерация'
        });
    }
    async run(message, args) {
        if (!message.member.permissions.has("MANAGE_MESSAGES"))
            return message.channel.send({ embed: { color: "RED", title: "❌ Уведомление", description: "**Вы не можете использовать эту команду!**" } })
        if (!args[0]) {
            return message.channel.send({ embed: { color: "RED", title: "❌ Уведомление", description: "**Укажите количество сообщений!**" } })

        }

        let deleteAmount;

        if (parseInt(args[0]) > 100) {
            deleteAmount = 100;
        } else {
            deleteAmount = parseInt(args[0]);
        }

        await message.channel.bulkDelete(deleteAmount, true);

        const embed = new MessageEmbed()
            .setTitle("🔔 Уведомление")
            .setDescription(` ${deleteAmount} сообщений было успешно удалено `)
            .setColor("BLUE")
        await message.channel
            .send(embed)
            .then((msg) => msg.delete({ timeout: 2000 }, true));


    }
}