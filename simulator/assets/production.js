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

    calcNetProd(consumption){
        this.netprod = (this.prod - consumption);
    }

    calcBuffer(netprod, ratio, o_buffer, batterylimit){
        if((o_buffer + (netprod * ratio)) >= batterylimit){ 
            this.buffer = batterylimit;
        }else if((o_buffer + (netprod * ratio)) <= 0){
            this.buffer = 0
        }
        else{
            this.buffer = o_buffer + (netprod * ratio);
        }
    }

    checkBlackout(totalbuffer, totalnetproduction){
        if(this.netprod <= 0 && totalbuffer <= 0 && this.buffer <= 0 && totalnetproduction <= 0){
            this.blackout = true;
        }else{
            this.blackout = false;
        }
    }
}
module.exports = new Production();
