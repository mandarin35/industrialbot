const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js')


module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: '',
            description: 'Случайный ответ на заданный вопрос',
            category: 'Развлекательные'
        });
    }
    async run(message, args, MenuDocsClient) {
        let question = message.content.slice(7);
        if (!question)
            return message.channel.send({ embed: { color: "RED", description: "**Вы не уточнили свой вопрос**!" } })
        else {
            let responses = [
                "Да",
                "Нет",
                "Определенно",
                "Скорее всего нет",
                "Возможно через миллион лет",
                "В другой раз, братишка",
                "Никогда, никогда, никогда",
            ];
            let response =
                responses[Math.floor(Math.random() * responses.length - 1)];
            message.delete({ timeout: 1 })
            let Embed = new MessageEmbed()
                .setTitle(`**🔔 Уведомление **`)
                .setDescription(`Ваш вопрос: ${question} \nМой ответ: ${response}`)
                .setColor("0xCC99FFE");
            message.channel.send(Embed);
        }
    }
};