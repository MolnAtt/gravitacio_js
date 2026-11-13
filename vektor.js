class PolarVektor{
    /**
     * 
     * @param {number} f - a szög fokban
     * @param {number} r - a vektor hossza
     */
    constructor(f,r){
        this.f = f; 
        this.r = r;
    }

    /**
     * A megadott szöggel elforgatja a vektort.
     * @param {number} f - a forgatási szög fokban
     * @returns {PolarVektor}
     */
    forgatott(f){
        return new PolarVektor(this.f+f, this.r);
    }
    
    /**
     * Descartes-féle koordinátákra váltja a polárkoordinátákkal megadott (polár)vektort.
     * @returns {Vektor}
     */
    to_cartesian(){
        let radf = to_radian(this.f);
        return new Vektor(this.r*Math.cos(radf), this.r*Math.sin(radf));
    }
}

/**
 * A radiánban megadott szöget átváltja fokba
 * @param {number} radian 
 * @returns {number}
 */
function to_degree(radian){
    return radian*180/Math.PI;
}

/**
 * a fokban megadott szöget átváltja radiánba
 * @param {number} degree 
 * @returns {number}
 */
function to_radian(degree){
    return degree*Math.PI/180;
}

class Vektor{
    /**
     * Létrehoz egy új vektort a megadott x és y Descartes-koordinátákkal.
     * @param {number} x 
     * @param {number} y 
     */
    constructor(x,y){
        this.x = x;
        this.y = y;
    }

    /**
     * Összead két vektort, és visszaadja az eredményt. Nem változtatja meg a paramétereket.
     * @param {Vektor} u 
     * @param {Vektor} v 
     * @returns {Vektor}
     */
    static plus(u,v){
        return new Vektor(u.x+v.x, u.y+v.y);
    }

    /**
     * Ez felel meg a vektoroknál a += műveletnek, de amúgy vissza is adja az új vektort. Megváltoztatja az aktuális vektort, és hozzáadja a paraméterként kapott vektort.
     * @param {Vektor} that 
     * @returns {Vektor}
     */
    hozzaad(that){
        this.x+=that.x;
        this.y+=that.y;
        return this;
    }

    /**
     * Kivonja a paraméterként kapott vektort az aktuális vektorból. Megváltoztatja az aktuális vektort, és visszaadja az új vektort. ez a -=-nek felel meg,
     * @param {Vektor} that 
     * @returns {Vektor}
     */
    csokkent(that){
        this.x-=that.x;
        this.y-=that.y;
        return this;
    }

    /**
     * Kivon két vektort, és visszaadja az eredményt. Nem változtatja meg a paramétereket.
     * ez a statikus metódus, így hívható: Vektor.minus(u,v), de a vektorinstancia metódus 
     * @param {Vektor} u 
     * @param {Vektor} v 
     * @returns {Vektor}
     */
    static minus(u,v){
        return new Vektor(u.x-v.x, u.y-v.y);
    }

    /**
     * Kivon két vektort, és visszaadja az eredményt. Nem változtatja meg a paramétereket. 
     * ez a vektorinstancia metódus, így hívható: u.minus(v) ez a - műveletnek felel meg.
     * @param {Vektor} u 
     * @param {Vektor} v 
     * @returns {Vektor}
     */
    minus(that){
        return new Vektor(this.x-that.x, this.y-that.y);
    }

    /**
     * Visszaadja a vektor ellentettjét. Nem változtatja meg a paramétert. Ez egy statikus metódus, a Vektor.ellentett(u) hívással érhető el.
     * @param {Vektor} u 
     * @returns {Vektor}
     */
    static ellentett(u){
        return u.ellentett();
    }

    /**
     * Visszaadja a vektor ellentettjét. Nem változtatja meg a vektort. Ez a vektorinstancia metódusa, v.ellentett() hívással érhető el.
     * @returns {Vektor}
     */
    ellentett(){
        return new Vektor(-this.x, -this.y);
    }


    /**
     * Balra forgatja a vektort 90 fokkal. Nem változtatja meg a paramétert.
     * Ez egy statikus metódus, a Vektor.balraforgat90(u) hívással érhető el.
     * @param {Vektor} u 
     * @returns {Vektor}
     */
    static balraforgat90(u){
        return u.balraforgat90();
    }

    /**
     * Balra forgatja a vektort 90 fokkal. Nem változtatja meg a paramétert. Ez a vektorinstancia metódusa, v.balraforgat90() hívással érhető el.
     * @returns {Vektor}
     */
    balraforgat90(){
        return new Vektor(-this.y, this.x);
    }


    /**
     * Jobbra forgatja a vektort 90 fokkal. Nem változtatja meg a paramétert.
     * @param {Vektor} u 
     * @returns {Vektor}
     */
    static jobbraforgat90(u){
        return u.jobbraforgat90();
    }

    /**
     * Jobbra forgatja a vektort 90 fokkal. Nem változtatja meg a paramétert. Ez a vektorinstancia metódusa, v.jobbraforgat90() hívással érhető el.
     * @returns {Vektor}
     */
    jobbraforgat90(){
        return new Vektor(this.y, -this.x);
    }


    /**
     * Ez a skalárszorzás (jobbról). Visszaadja a vektor és a szám szorzatát. Nem változtatja meg a paramétereket. Ez egy statikus metódus, a Vektor.szamszoroz(u,a) hívással érhető el.
     * @param {Vektor} u 
     * @param {number} a 
     * @returns {Vektor}
     */
    static szor(u,a){
        return u.szor(a);
    }

    /**
     * Ez a skalárszorzás (jobbról). Visszaadja a vektor és a szám szorzatát. Nem változtatja meg a paramétereket. Ez a vektorinstancia metódusa, v.szamszoroz(a) hívással érhető el.
     * @param {number} a 
     * @returns {Vektor}
     */
    szor(a){
        return new Vektor(this.x*a, this.y*a);
    }


    /**
     * Ez a skalárosztás (jobbról). Visszaadja a vektor és a szám hányadosát. Nem változtatja meg a paramétereket. Ez a vektorinstancia metódusa, v.oszt(a) hívással érhető el.
     * @param {number} a 
     * @returns {Vektor}
     */
    oszt(a){
        return new Vektor(this.x/a, this.y/a);
    }

    /**
     * Ez a skalárosztás (jobbról). Visszaadja a vektor és a szám hányadosát. Nem változtatja meg a paramétereket. Ez egy statikus metódus, a Vektor.szamoszt(u,a) hívással érhető el.
     * @param {Vektor} u 
     * @param {number} a 
     * @returns {Vektor}
     */
    static oszt(u,a){
        return u.oszt(a);
    }

    /**
     * Visszaadja a Descartes-koordinátákkal megadott vektor polárkoordinátás reprezentációját.
     * @returns {PolarVektor}
     */
    to_polar(){
        return new PolarVektor(to_degree(Math.atan2(this.y,this.x)), this.hossz());
    }

    /**
     * Megadja a vektor hosszát. Nem változtatja meg a paramétert. Ez a vektorinstancia metódusa, v.hossz() hívással érhető el.
     * @returns {number}
     */
    hossz(){
        return Math.sqrt(this.hossznegyzet());
    }

    /**
     * Megadja a vektor hosszának négyzetét. Nem változtatja meg a paramétert. Ez a vektorinstancia metódusa, v.hossznegyzet() hívással érhető el.
     * @returns {number}
     */
    hossznegyzet(){
        return this.x*this.x+this.y*this.y;
    }

    /**
     * Elforgatja a vektort a megadott szöggel. Nem változtatja meg a paramétert. Ez egy statikus metódus, a Vektor.forgatott(u,fok) hívással érhető el.
     * @param {Vektor} u 
     * @param {number} fok 
     * @returns {Vektor}
     */
    static forgatott(u, fok){
        return u.forgatott(fok);
    }
    
    /**
     * Elforgatja a vektort a megadott szöggel. Nem változtatja meg a paramétert. Ez a vektorinstancia metódusa, v.forgatott(fok) hívással érhető el.
     * @param {number} fok 
     * @returns {Vektor}
     */
    forgatott(fok){
        return this.to_polar().forgatott(fok).to_cartesian();
    }
    

    /**
     * Visszaadja a vektor egységvektorát. Nem változtatja meg a paramétert. Ez a vektorinstancia metódusa, v.egysegvektora() hívással érhető el.
     * @returns {Vektor}
     */
    egysegvektora(){
        return new Vektor(this.x/this.hossz(), this.y/this.hossz());
    }

    /**
     * Lemásolja a vektort, és visszaadja az új vektort. Nem változtatja meg a paramétert. Ez a vektorinstancia metódusa, v.masolat() hívással érhető el.
     * @returns {Vektor}
     */
    masolat(){
        return new Vektor(this.x, this.y);
    }
}