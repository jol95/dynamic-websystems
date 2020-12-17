const distribution = require("./distribute");

class Production{
    prod;
    price;
    constructor(){
        distribution.distributeAvg();
    }

    //TODO : more realistic function, maybe implement battery limits?
    prodAvg(){
        //if the wind is less than 25% of max
        if (distribution.wDay < 4 /**distribution.windDistMax/4*/){ 
            this.prod = 0;
        } else {
            this.prod = distribution.wDay * 10 //TODO: real value
        }
        console.log("\n" + "prod = " + this.prod);
    }

    //TODO: more realisitc function, probably with a function
    calcPrice(){
        if(distribution.wHour < 1){
            this.price = 4;
        } else if(distribution.wDay < 2 && distribution.wHour >=1){
            this.price = 3;
        } else if(distribution.wDay < 3 && distribution.wHour >=2){
            this.price = 2;
        } else {
            this.price = 1;
        }
        
        if(distribution.cons < 40){
            this.price = this.price*0.3;
        } else if(distribution.cons < 50 && distribution.cons > 40) {
            this.price = this.price*0.4;
        } else if(distribution.cons < 60 && distribution.cons > 50){
            this.price = this.price*0.5;
        } else {
            this.price = this.price*0.6;
        }
        
        console.log("\n" + "Price = " + this.price);
    }

}
/*
yolo = new Production();
yolo.calcPrice();
*/
