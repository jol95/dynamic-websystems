const normdist = require("../normaldist.js");
class Distribute{
    wDay;
    cons;
    constructor(){
        this.windDistMin = 0;
        this.windDistMax = 0;
        this.windDistScew = 1;

        /*
            http://ceur-ws.org/Vol-923/paper05.pdf
        */
        this.consDistMin = 5.9;
        this.consDistMax = 19.4;
        this.consDistScew = 1;
    }

    windMinMaxAvg(){
        this.windDistMin = normdist.nmdist(0, 4.3, this.windDistScew);
        this.windDistMax = normdist.nmdist(4.3, 8.6, this.windDistScew);
    }

    windDayAvg(){
        this.windMinMaxAvg()
        this.wDay = normdist.nmdist(this.windDistMin, this.windDistMax, this.windDistScew);
    }

    consDayAvg(){
        this.cons = normdist.nmdist(this.consDistMin, this.consDistMax, this.consDistScew);
        console.log("^^ cons ^^");
    }

}
module.exports = new Distribute();

/*
yolo = new Distribute();
yolo.windDayAvg();
yolo.windHourAvg();
yolo.consAvg();
*/
