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
    async run(message, args, MenuDocsClient) {
        const embed = new MessageEmbed()
            .setTitle("🔔 Нарушения")
            .setDescription(`
            В этом текстовом канале Вы можете отправлять нарушения, найденные в мире.

            **Пример отправки сообщения в этом чате:**
            /vio x y z пункт
             `)
            .setColor("0xCC99FF")
        await message.channel
            .send(embed)
    }
}