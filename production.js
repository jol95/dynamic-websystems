const distribution = require("./distribute");

class Production{
    dist;
    prod;
    constructor(){
        //this.dist = new distribution;
        distribution.windDayAvg();
        distribution.windHourAvg();
    }
    //TODO : more realistic function, maybe implement battery limits?
    prodAvg(){
        //if the wind is less than 25% of max
        if (distribution.wHour < 4 /**distribution.windDistMax/4*/){ 
            this.prod = 0;
        } else {
            this.prod = distribution.wHour * 10 //TODO: real value
        }
        console.log("\n" + "prod = " + this.prod);
    }

}

yolo = new Production();
yolo.prodAvg();