const puppeteer = require('puppeteer');
const IG_URL = "https://www.instagram.com";

const instagram = {
    browser: null,
    page: null,

    async init(settings) {
        this.browser = await puppeteer.launch({ headless: false });

        this.page = await this.browser.newPage();

        this.settings = settings;
    },

    async login(username, password) {
        await this.page.goto(`${IG_URL}/accounts/login/?source=auth_switcher`, { waitUntil: 'networkidle2' });

        await this.page.waitFor(() => document.querySelectorAll('input').length);
        await this.page.waitFor(this.settings.before_work_delay);

        await this.page.type('input[name="username"]', username, { delay: this.settings.type_delay });
        await this.page.type('input[name="password"]', password, { delay: this.settings.type_delay });

        await this.page.waitFor(() => document.querySelectorAll('button').length);
        await this.page.waitFor(this.settings.click_delay);

        await this.page.click('button._0mzm-.sqdOP.L3NKy');
    },

    async skipNotify() {
        await this.page.waitFor(() => document.querySelectorAll('button.aOOlW.HoLwm').length);
        await this.page.waitFor(this.settings.before_work_delay);

        await this.page.waitFor(this.settings.click_delay);

        await this.page.click('button.aOOlW.HoLwm');
    },

    async likeTags(tags = []) {

        console.log(tags)
        for (const tag of tags) {
            await this.page.goto(`https://www.instagram.com/explore/tags/${tag}/`, { waitUntil: 'networkidle2' });

            await this.page.waitFor(() => document.querySelectorAll('article'));
            await this.page.waitFor(this.settings.before_work_delay);

            let posts = await this.page.$$('article > div:nth-child(3) img[decoding="auto"]');

            for (const post of posts) {
                await post.click();

                await this.page.waitFor('span[id="react-root"][aria-hidden="true"]');
                await this.page.waitFor(this.settings.before_work_delay);

                let isLikable = await this.page.$('button.dCJp8.afkep._0mzm- span[aria-label="Нравится"]');

                if (isLikable) {
                    await this.page.waitFor(this.settings.like_delay);
                    await this.page.click('button.dCJp8.afkep._0mzm-');
                }

                await this.page.waitFor(this.settings.before_work_delay);

                var closeModalButton = await this.page.$x('//button[contains(text(), "Закрыть")]');
                await closeModalButton[0].click();

                await this.page.waitFor(this.settings.before_work_delay);
            }

            await this.page.waitFor(this.settings.tag_like_delay);
        }

    }
}

module.exports = instagram;