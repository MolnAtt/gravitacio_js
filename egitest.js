class Egitest{
    constructor(nev, tomeg, p, v, belszin, kulszin){
        this.nev = nev;
        this.tomeg = tomeg;
        this.belszin = belszin;
        this.kulszin = kulszin;
        this.p = p;
        this.v = v;
        this.svgobject = this.svgbe();
    }

    mozogj(){
        this.p.hozzaad(this.v);
        this.frissit();
    }

    frissit(){
        this.svgobject.setAttribute('cx', this.p.x);
        this.svgobject.setAttribute('cy', this.p.y);
    }
/**
 * 
 * @param {Egitest[]} egitestek 
 */
    static gravitacios_kolcsonhatas(egitestek){
        for (const e1 of egitestek) {
            for (const e2 of egitestek) {
                if(e1!=e2){
                    e1.v.hozzaad(this.gravitacios_kolcsonhatas_par(e1,e2));
                }
            }
        }
    }

    /**
     * 
     * @param {Egitest} e 
     * @param {Egitest} f 
     * @returns {Vektor}
     */
    static gravitacios_kolcsonhatas_par(e,f){

    }

    svgbe(){
        let svgo = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
        // <circle/>
        svgo.setAttribute('cx', this.p.x);
        svgo.setAttribute('cy', this.p.y);
        svgo.setAttribute('r', Math.sqrt(this.tomeg));
        svgo.setAttribute('stroke', this.kulszin);
        svgo.setAttribute('stroke-width', '2');
        svgo.setAttribute('fill', this.belszin);
        // svgobject.setAttribute('id', "bela");
        return svgo;
    }
}


