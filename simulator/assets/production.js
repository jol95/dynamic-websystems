const { cons } = require("./distribute");

class Production{
    constructor(){
       
    }

    calcProd(wind){
        var prod = 0;
        var limit = 4.0;

        if (wind < limit){ 
            prod = 0;
        }else if(limit < wind){
            prod = (wind * 2.8);  
        }

        return prod;
    }

    calcNetProd(prod, consumption){
        return prod - consumption;
    }

    calcBuffer(netprod, buffer, ratio, limit){
        var sum_buffer = 0;

        if((buffer + (netprod * ratio)) >= limit){ // 100 kW limit for battery on house
            sum_buffer = limit;
        }else if((buffer + (netprod * ratio)) <= 0){
            sum_buffer = 0;
        }
        else{
            sum_buffer = buffer + (netprod * ratio);
        }

        return sum_buffer;
    }

    ifBlackout(netprod, buffer, totalbuffer, totalnetprod){
        var blackout = false;

        if(netprod <= 0 && buffer <= 0 && totalbuffer <= 0  && totalnetprod <= 0){
            blackout = true;
        }

        return blackout;
    }

    // calcPrice(production, consumption){
    //     if(wind < 1.0){
    //         this.price = 4.0;
    //     } else if(1.0 < wind < 2.0){
    //         this.price = 3.0;
    //     } else if(2.0 < wind < 3.0){
    //         this.price = 2.0;
    //     } else {
    //         this.price = 1.0;
    //     }

    //     if(consumption < 8.0){
    //         this.price = this.price*0.3;
    //     } else if(consumption < 12.0 && consumption > 8.0) {
    //         this.price = this.price*0.4;
    //     } else if(consumption < 15.0 && consumption > 12.0){
    //         this.price = this.price*0.5;
    //     } else {
    //         this.price = this.price*0.6;
    //     }
    // }
}
module.exports = new Production();


