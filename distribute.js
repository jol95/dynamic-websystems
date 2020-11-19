const dist = require("./normaldist.js");
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
        this.wDay = dist.nmdist(this.windDistMin,this.windDistMax,this.windDistScew);
        console.log("^^ wDay ^^");
    }

    windHourAvg(){
        this.distMinHour = this.wDay - this.wDay/3; //TODO: better function
        this.distMaxHour = this.wDay + this.wDay/3; //TODO: better function
        this.wHour = dist.nmdist(this.distMinHour,this.distMaxHour,this.windDistScew);
        console.log("^^ wHour ^^");
    }

    consAvg(){
        this.cons = dist.nmdist(this.consDistMin, this.consDistMax, this.consDistScew);
        console.log("^^ cons ^^");
    }

}

yolo = new Distribute();
yolo.windDayAvg();
yolo.windHourAvg();
yolo.consAvg();

