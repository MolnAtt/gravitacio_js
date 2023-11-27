class Galaxis{
    constructor(nev){
        this.nev = nev;
        this.egitestei = []
    }

    eltolas(v){
        for (const egitest of this.egitestei) {
            egitest.p.hozzaad(v);
        }
    }

    sulypont(){
        let result = new Vektor(0,0);
        console.log(result);
        for (const egitest of this.egitestei) {
            result.hozzaad(egitest.p);
        }
        result.leosztja(this.egitestei.length);
        return result;
    }
}