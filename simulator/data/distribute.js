const normdist = require("./normaldist.js");
class Distribute{
    wDay;
    wHour;
    cons;
    constructor(){
        this.windDistMin = 0;
        this.windDistMax = 10;
        this.windDistScew = 1;

        this.consDistMin = 20;
        this.consDistMax = 100;
        this.consDistScew = 1;
    }

    windDayAvg(){
        this.wDay = normdist.nmdist(this.windDistMin,this.windDistMax,this.windDistScew);
        console.log("^^ wDay ^^");
    }

    windHourAvg(){
        this.distMinHour = this.wDay - this.wDay/2; //TODO: better function
        this.distMaxHour = this.wDay + this.wDay/2; //TODO: better function
        this.wHour = normdist.nmdist(this.distMinHour,this.distMaxHour,this.windDistScew);
        console.log("^^ wHour ^^");
        //return this.windDistMax; //for use in prodAVG
    }

    consAvg(){
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
