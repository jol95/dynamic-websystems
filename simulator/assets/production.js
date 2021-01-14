const { cons } = require("./distribute");

class Production{
    prod;
    price;
    netprod;
    buffer;
    blackout;

    calcProd(wind){
        var limit = 4.0

        if (wind < limit){ 
            this.prod = 0;
        }else if(limit < wind){
            this.prod = (wind * 2.8);  
        }
    }
    
    calcNetProd(prod, consumption){
        this.netprod = prod - consumption;
    }

    calcBuffer(netprod, o_buffer, ratio, limit){
        if((o_buffer + (netprod * ratio)) >= limit){ // 100 kW limit for battery on house
            this.buffer = limit;
        }else if((o_buffer + (netprod * ratio)) <= 0){
            this.buffer = 0;
        }
        else{
            this.buffer = o_buffer + (netprod * ratio);
        }
    }

    ifBlackout(netprod, buffer, totalbuffer, totalnetprod){
        if(netprod <= 0 && buffer <= 0 && totalbuffer <= 0  && totalnetprod <= 0){
            this.blackout = true;
        }else{
            this.blackout = false;
        }
    }
}


module.exports = new Production();
