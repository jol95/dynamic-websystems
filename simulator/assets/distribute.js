const normdist = require("../normaldist.js");
class Distribute{
    wind;
    cons;
    constructor(){
        this.windDistMin = 0.0;
        this.windDistMax = 0.0;
        this.windDistScew = 1.0;

        /*
            http://ceur-ws.org/Vol-923/paper05.pdf
        */
        this.consDistMin = 0.0;
        this.consDistMax = 0.0;
        this.consDistScew = 1.0;
    }

    distributeInit(){
        this.windDistMin = normdist.nmdist(0.0, 4.20, this.windDistScew);
        this.windDistMax = normdist.nmdist(6.5, 10.0, this.windDistScew);

        this.consDistMin = normdist.nmdist(5.9, 12.65, this.consDistScew);
        this.consDistMax = normdist.nmdist(12.65, 19.4, this.consDistScew);
    }

    distributeAvg(){
        this.wind = normdist.nmdist(this.windDistMin, this.windDistMax, this.windDistScew);
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
