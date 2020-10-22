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
        let mjb = args[0];
        if (!mjb)
            return message.channel.send({ embed: { color: "RED", title: "❌ Уведомление", description: "**Вы не уточнили наказание!**" } })
        let nick = args[1];
        if (!nick)
            return message.channel.send({ embed: { color: "RED", title: "❌ Уведомление", description: "**Вы не уточнили ник игрока!**" } })
        let time = args[2];
        if (!time)
            return message.channel.send({ embed: { color: "RED", title: "❌ Уведомление", description: "**Вы не уточнили время наказания!**" } })
        let rules = args[3];
        if (!rules)
            return message.channel.send({ embed: { color: "RED", title: "❌ Уведомление", description: "**Вы не уточнили пункт правил!**" } })


        let forum = args[4];
        if (!forum)
            return message.channel.send({ embed: { color: "RED", title: "❌ Уведомление", description: "**Вы не уточнили ссылку на тему!**" } })



        message.delete({ timeout: 1 })
        let Embed = new MessageEmbed()
            .setTitle(`**🔔 Работа с форумом  **`)
            .setDescription(`**ВЫДАТЬ НАКАЗАНИЕ:** ${mjb} ${nick} ${time} ${rules}`)
            .setFooter(message.author.tag)
            .setColor("0xCC99FF");

        message.channel.send(Embed);

    }
}