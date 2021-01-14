const normdist = require("./normaldist/normaldist.js");

class Distribute{
    constructor(){
        this.windMin = 1.0;
        this.windMax = 8.5;

        this.windDistMin = 0.0;
        this.windDistMax = 0.0;
        this.windDistScew = 1.0;

        /*
            http://ceur-ws.org/Vol-923/paper05.pdf
        */
        this.consMin = 5.9;
        this.consMax = 19.4;

        this.consDistMin = 0.0;
        this.consDistMax = 0.0;
        this.consDistScew = 1.0;

        this.wind;
        this.cons;
    }

    distributeInit(){
        this.windDistMin = normdist.nmdist(this.winMin, 4.0, this.windDistScew); 
        this.windDistMax = normdist.nmdist(6.5, this.winMax, this.windDistScew); 

        this.consDistMin = normdist.nmdist(this.consMin, 12.65, this.consDistScew);
        this.consDistMax = normdist.nmdist(12.65, this.consMax, this.consDistScew);
    }

    calcWind() {
        this.wind = normdist.nmdist(this.windDistMin, this.windDistMax, this.windDistScew);
    }

    calcConsumption(){
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
