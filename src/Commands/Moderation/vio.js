const { MessageEmbed } = require('discord.js')
const Command = require('../../Structures/Command');
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: '',
            description: ' ',
            category: 'Взаимодействие'
        });
    }
    async run(message, args) {
        let tp = args[0];
        if (!x)
            return message.channel.send({ embed: { color: "RED", title: "❌ Уведомление", description: "**Вы не уточнили X координату нарушения!**" } })
        let x = args[0];
        if (!x)
            return message.channel.send({ embed: { color: "RED", title: "❌ Уведомление", description: "**Вы не уточнили X координату нарушения!**" } })
        let y = args[1];
        if (!y)
            return message.channel.send({ embed: { color: "RED", title: "❌ Уведомление", description: "**Вы не уточнили Y координатy нарушения!**" } })
        let z = args[2];
        if (!z)
            return message.channel.send({ embed: { color: "RED", title: "❌ Уведомление", description: "**Вы не уточнили Z координату нарушения!**" } })


        let rules = args[3];
        if (!rules)
            return message.channel.send({ embed: { color: "RED", title: "❌ Уведомление", description: "**Вы не уточнили пункт нарушения!**!" } })



        message.delete({ timeout: 1 })
        let Embed = new MessageEmbed()
            .setTitle(`**🔔 Нарушение  **`)
            .setDescription(`**Координаты: /tppos ${x} ${y} ${z}**
             **Пункт: ${rules}**`)
            .setColor("0xCC99FF");
        message.channel.send(Embed);

    }
}