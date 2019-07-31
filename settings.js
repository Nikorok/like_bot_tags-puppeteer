const random = require('random');

module.exports = {

    "delaies": {
        // Задержка перед любым действием
        "before_work_delay": 2000 + random.int(100, 2000),

        // Задержка при печати
        "type_delay": 20 + random.int(100, 200),

        // Задержка перед лайком
        "like_delay": 1000 + random.int(100, 300),

        // Задержка перед нажатиями
        "click_delay": 350 + random.int(100, 100),

        "tag_like_delay": 30000 + random.int(5000, 30000)
    },

    // Размер экрана
    "viewport": {
        "width": 1366,
        "height": 768
    }
}