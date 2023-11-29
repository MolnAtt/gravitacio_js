class Galaxis{
    constructor(nev){
        this.nev = nev;
        this.egitestei = [];
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

    nyilak_update(){
        for (const egitest of this.egitestei) {
            egitest.svg_nyil_update();
        }
    }

    nyillathatosag_kapcs(){
        for (const egitest of this.egitestei) {
            egitest.svgnyil.classList.toggle('lathatatlan');
        }
    }

    utkozeses_kolcsonhatas(){
        for (let i = 0; i < this.egitestei.length; i++) {
            for (let j = i+1; j < this.egitestei.length; j++) {
                if (this.egitestei[i].utkozik(this.egitestei[j])){
                    this.egitestei[i].beolvaszt(this.egitestei[j])
                }
            }
        }
    }
}