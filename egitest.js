class Egitest{
    constructor(nev, tomeg, p, v, belszin, kulszin){
        this.nev = nev;
        this.tomeg = tomeg;
        this.belszin = belszin;
        this.kulszin = kulszin;
        this.p = p;
        this.v = v;
    }

    mozog(){
        this.p+=this.v;
    }
}


let napocska = new Egitest("Nap", 10, new Vektor(3, 4), new Vektor(5, 7), "red", "black");