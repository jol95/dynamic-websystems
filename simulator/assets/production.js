const { cons } = require("./distribute");

class Production{
    prod;
    price;
    ratio;
    netprod;
    netprodbuffer;
    netprodmarket;
    buffer;
    blackout;

    calcProd(wind){
        if (wind < 4.0){ 
            this.prod = 0.0;
        }else{
            this.prod = (wind * 3);  
        }
    }

    setRatio(ratio){
        this.ratio = ratio;
    }

    calcNetProd(consumption){
        this.netprod = (this.prod - consumption);
        this.netprodbuffer = this.netprod * this.ratio;
        this.netprodmarket = this.netprod * (1 - this.ratio)
    }

    calcBuffer(o_buffer, batterylimit){
        if((o_buffer + this.netprodbuffer) >= batterylimit){ 
            this.buffer = batterylimit;
            this.netprodmarket = (o_buffer + this.netprodbuffer) - batterylimit

        }else if((o_buffer + this.netprodbuffer) <= 0){
            this.buffer = 0
        }
        else{
            this.buffer = o_buffer + this.netprodbuffer;
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
