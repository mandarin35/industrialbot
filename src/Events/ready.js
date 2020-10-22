const Event = require('../Structures/Event');

module.exports = class extends Event {

    constructor(...args) {
        super(...args, {
            once: true
        });
    }

    run() {
        console.log([
            `Бот авторизирован как ${this.client.user.tag}`,
            `Загружено ${this.client.commands.size} команд!`,
            `Загружено ${this.client.events.size} событий!`
        ].join('\n'));

        const activities = [
            `${this.client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)} участников!`
        ];

        let i = 0;
        setInterval(() => this.client.user.setActivity(`${this.client.prefix}help | ${activities[i++ % activities.length]}`, { type: 'WATCHING' }), 15000);
    }


};