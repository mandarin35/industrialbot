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
        let nick = args[0];
        if (!nick)
            return message.channel.send({ embed: { color: "RED", title: "❌ Уведомление", description: "**Вы не уточнили, свой никнейм**" } })
        let otop = args[1];
        if (!otop)
            return message.channel.send({ embed: { color: "RED", title: "❌ Уведомление", description: "**Вы не уточнили, что Вы берете (отгул/отпуск)**" } })
        let data = args[2];
        if (!data)
            return message.channel.send({ embed: { color: "RED", title: "❌ Уведомление", description: "**Вы не уточнили дату отпуска/отгула**" } })




        message.delete({ timeout: 1 })
        let Embed = new MessageEmbed()
            .setTitle(`**🔔 Отгул/Отпуск  **`)
            .setDescription(`**Модератор:** ${nick} **${otop}**: ${data} `)
            .setFooter(message.author.tag)
            .setColor("0xCC99FF");

        message.channel.send(Embed);

    }
}