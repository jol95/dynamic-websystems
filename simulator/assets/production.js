const { cons } = require("./distribute");

class Production{
    prod;
    price;
    netprod;
    buffer;

    //TODO : more realistic function, maybe implement battery limits?
    calcProd(wind){
        console.log(wind)
        //if the wind is less than 25% of max
        if (wind < 4.0){ 
            console.log("wind is less")
            this.prod = 0.0;
        }else{
            this.prod = (wind * 3.2);  //TODO: real value
        }

        console.log(this.prod);
    }

    //TODO: more realisitc function, probably with a function
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

    calcBuffer(buffer, netprod){
        this.buffer = buffer + (netprod);
        console.log(this.buffer)
    }

}
module.exports = new Production();


