class Production{
    prod;
    price;
    constructor(){
        this.prodAvg;
        this.calcPrice;
    }

    //TODO : more realistic function, maybe implement battery limits?
    prodAvg(wind){
        //if the wind is less than 25% of max
        if (wind < 4 /**distribution.windDistMax/4*/){ 
            this.prod = 0;
        } else {
            this.prod = wind * 10 //TODO: real value
        }
    }

    //TODO: more realisitc function, probably with a function
    calcPrice(wind, consumption){
        if(wind < 1){
            this.price = 4;
        } else if(1 < wind < 2){
            this.price = 3;
        } else if(2 < wind < 3){
            this.price = 2;
        } else {
            this.price = 1;
        }

        if(consumption < 8){
            this.price = this.price*0.3;
        } else if(consumption < 12 && consumption > 8) {
            this.price = this.price*0.4;
        } else if(consumption < 15 && consumption > 12){
            this.price = this.price*0.5;
        } else {
            this.price = this.price*0.6;
        }
    }

}
module.export = new Production();
/*
yolo = new Production();
yolo.calcPrice();
*/
