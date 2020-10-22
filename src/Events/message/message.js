const Event = require('../../Structures/Event');

module.exports = class extends Event {

        async run(message) {
                const mentionRegex = RegExp(`^<@!?${this.client.user.id}>$`);
                const mentionRegexPrefix = RegExp(`^<@!?${this.client.user.id}> `);

                if (message.author.bot) return;

                if (message.content.match(mentionRegex)) message.channel.send(`Мой префикс для ${message.guild.name} - \`${this.client.prefix}\`.`);

                const prefix = message.content.match(mentionRegexPrefix) ?
                    message.content.match(mentionRegexPrefix)[0] : this.client.prefix;

                if (!message.content.startsWith(prefix)) return;

                const [cmd, ...args] = message.content.slice(prefix.length).trim().split(/ +/g);

                const command = this.client.commands.get(cmd.toLowerCase()) || this.client.commands.get(this.client.aliases.get(cmd.toLowerCase()));
                if (command) {

                    if (command.ownerOnly && !this.client.utils.checkOwner(message.author.id)) {
                        return message.reply('Эту команду может использовать только создатель бота');
                    }

                    if (command.guildOnly && !message.guild) {
                        return message.reply('Эта команда может быть использована только на сервере');
                    }

                    if (command.nsfw && !message.channel.nsfw) {
                        return message.reply('Эта команда может быть использована только в NSFW-канале');
                    }

                    if (command.args && !args.length) {
                        return message.reply(`Для работы этой команды требуются аргументы. Использование: ${command.usage ?
					`${this.client.prefix + command.name} ${command.usage}` : 'Эта команда не имеет формата использования'}`);
			}
			
			if (message.guild) {
				const userPermCheck = command.userPerms ? this.client.defaultPerms.add(command.userPerms) : this.client.defaultPerms;
				if (userPermCheck) {
					const missing = message.channel.permissionsFor(message.member).missing(userPermCheck);
					if (missing.length) {
						return message.reply(`Вам не хватает ${this.client.utils.formatArray(missing.map(this.client.utils.formatPerms))} прав, чтобы использовать эту команду`);
					}
				}

				const botPermCheck = command.botPerms ? this.client.defaultPerms.add(command.botPerms) : this.client.defaultPerms;
				if (botPermCheck) {
					const missing = message.channel.permissionsFor(this.client.user).missing(botPermCheck);
					if (missing.length) {
						return message.reply(`Мне не хватает ${this.client.utils.formatArray(missing.map(this.client.utils.formatPerms))} прав, добавьте чтобы я мог использовать!`);
					}
				}
			}
			
			command.run(message, args);
		}
	}

};