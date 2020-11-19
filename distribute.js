
class distribute{
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
    //Credit: https://stackoverflow.com/questions/25582882/javascript-math-random-normal-distribution-gaussian-bell-curve
    nmdist(min, max, skew) {
        let u = 0, v = 0;
        while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
        while(v === 0) v = Math.random();
        let num = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );

        num = num / 10.0 + 0.5; // Translate to 0 -> 1
        if (num > 1 || num < 0) num = nmdist(min, max, skew); // resample between 0 and 1 if out of range
        num = Math.pow(num, skew); // Skew
        num *= max - min; // Stretch to fill range
        num += min; // offset to min
        return num;
    }

    windDayAvg(){
        this.wDay = nmdist(this.windDistMin,this.windDistMax,this.windDistScew);
    }

    windHourAvg(){
        this.distMinHour = this.wDay - this.wDay/4; //TODO: better function
        this.distMaxHour = this.wDay + this.wDay/4; //TODO: better function
        this.wHour = nmdist(this.distMinHour,this.distMaxHour,this.windDistScew);
    }

    consAvg(){
        this.cons = nmdist(this.consDistMin, this.consDistMax, this.consDistScew);
    }
}
