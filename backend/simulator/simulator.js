const distribute = require("./old/distribute");
const { windDayAvg } = require("./old/distribute");

    tick = 1000;
    setInterval(() => {
        distribute.windDayAvg();
        console.log(distribute.wDay);
        console.log("^^ WIND ^^");
    }, tick);

