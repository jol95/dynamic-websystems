const distribute = require("./old/distribute");

    tick = 1000;
    setInterval(() => {
        distribute.distributeAvg();
        console.log(distribute.wDay);
        console.log("^^ WIND ^^");
        console.log(distribute.cons);
        console.log("^^ CONS^^");
    }, tick);

