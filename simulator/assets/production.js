const { cons } = require("./distribute");

class Production{
    prod;
    price;
    netprod;
    buffer;
    blackout;

    calcProd(wind){
        if (wind < 4.0){ 
            this.prod = 0.0;
        }else{
            this.prod = (wind * 3);  
        }
    }
    
    calcPrice(wind, consumption){
        if(wind < 1.0){
            this.price = 4.0;
        } else if(1.0 < wind < 2.0){
            this.price = 3.0;
        } else if(2.0 < wind < 3.0){
            this.price = 2.0;
        } else {
            this.price = 1.0;
        }

        if(consumption < 8.0){
            this.price = this.price*0.3;
        } else if(consumption < 12.0 && consumption > 8.0) {
            this.price = this.price*0.4;
        } else if(consumption < 15.0 && consumption > 12.0){
            this.price = this.price*0.5;
        } else {
            this.price = this.price*0.6;
        }
    }

    calcNetProd(consumption){
        this.netprod = this.prod - consumption;
    }

    calcBuffer(netprod, ratio, o_buffer){
        if((o_buffer + (netprod * ratio)) > 100){
            buffer = buffer
        }else{
            buffer = o_buffer + (netprod * ratio);
        }
    }

    checkBlackout(totalbuffer){
        if(this.netprod <= 0 && totalbuffer <= 0 && this.buffer <= 0){
            blackout = true;
        }else{
            blackout = false;
        }
    }
}
module.exports = new Production();


