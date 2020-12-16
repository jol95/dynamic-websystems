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
        this.consDistMin = 0;
        this.consDistMax = 0;
        this.consDistScew = 1;
    }

    distributeAvg(){
        this.windDistMin = normdist.nmdist(0, 4.3, this.windDistScew);
        this.windDistMax = normdist.nmdist(4.3, 8.6, this.windDistScew);

        this.consDistMin = normdist.nmdist(5.9, 12.65, this.consDistScew);
        this.consDistMax = normdist.nmdist(12.65, 19.4, this.consDistScew);

        this.wDay = normdist.nmdist(this.windDistMin, this.windDistMax, this.windDistScew);
        this.cons = normdist.nmdist(this.consDistMin, this.consDistMax, this.consDistScew);
    }
}
module.exports = new Distribute();

/*
yolo = new Distribute();
yolo.windDayAvg();
yolo.windHourAvg();
yolo.consAvg();
*/
