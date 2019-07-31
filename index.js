const instagram = require('./instagram');
const settings = require('./settings');

const enquirer = require('enquirer');
const logger = require('logger').createLogger('logs.log');

const INIT_FORM = [
    {
        type: 'input',
        name: 'username',
        message: "Логин от акаунта (С него которого бедет проводиться лайкинг): "
    },
    {
        type: 'password',
        name: 'password',
        message: "Пароль от акаунта: ",
        mask: '*'
    },
    {
        type: 'input',
        name: 'tags',
        message: 'Тэги для дайкинга без #'
    }
];

(async () => {

    const { username, password, tags } = await enquirer.prompt(INIT_FORM);

    try {
        await instagram.init(settings.delaies);

        await instagram.login(username, password);

        await instagram.skipNotify();

        await instagram.likeTags(tags.split(/\s*\,\s*/g));

        await instagram.browser.close();
    } catch (error) {
        logger.error(error);
    }

})();