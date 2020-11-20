const distribute = require("./distribute");
   
    tick = 1000;
    setInterval(() => {
        distribute.windDayAvg();
    }, tick);
