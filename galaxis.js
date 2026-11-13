class Galaxis{
    /**
     * A Galaxis osztály reprezentál egy galaxist, amely égitestekből áll. A galaxis neve és az égitestek listája a konstruktorban kerül beállításra.
     * A galaxis képes eltolni az égitesteket, kiszámítani a súlypontját, frissíteni az égitestekhez tartozó nyilakat, kezelni az ütközéseket és a gravitációs kölcsönhatásokat, mozgatni az égitesteket, valamint visszaállítani az eredeti állapotot.
     * Lényegében ez az osztály felelős a galaxis dinamikájának kezeléséért és az égitestek vizualizációjáért.
     * @class
     * @param {string} nev A galaxis neve.
     */
    constructor(nev){
        this.nev = nev;
        this.egitestei = [];
        this.nem_kezelt_egitestei = [];
    }

    /**
     * Ez a metódus eltolja az összes égitestet a galaxisban a megadott vektorral. A vektor komponensei (x, y) határozzák meg az eltolás mértékét a Descartes-koordinátarendszerben.
     * Erre azért van szükség, mert néha a galaxis kimozog a látható területről, és ilyenkor az égitesteket vissza kell tolni a látható területre.
     * @param {Vektor} v Az eltolás vektora.
     */
    eltol(v){
        for (const egitest of this.egitestei) {
            egitest.p.hozzaad(v);
        }
    }

    /**
     * Kiszámítja a galaxis súlypontját az égitestek pozíciója alapján. (a név itt megtévesztő, a tömeg nem számít, ez csak a koordinátageometriából tanult matematikai fogalom, a koordináták átlaga!)
     * @returns {Vektor} A galaxis súlypontja.
     */
    sulypont(){
        let result = new Vektor(0,0);
        for (const egitest of this.egitestei) {
            result.hozzaad(egitest.p);
        }
        return result.oszt(this.egitestei.length);
    }

    /**
     * Frissíti az összes égitesthez tartozó nyilakat a galaxisban. A nyilak a bolygók sebességét vizualizálják, és a frissítés során a nyilak pozíciója és iránya a bolygók aktuális pozíciója és sebessége alapján kerül meghatározásra.
     * @returns {void}
     */
    nyilak_update(){
        for (const egitest of this.egitestei) {
            egitest.svg_nyil_update();
        }
    }

    /**
     * Ez a metódus kapcsolja a nyilak láthatóságát a galaxisban. Ha a nyilak jelenleg láthatóak, akkor elrejti őket, ha pedig el vannak rejtve, akkor megjeleníti őket. A nyilak a bolygók sebességét vizualizálják.
     * @returns {void}
     */
    nyillathatosag_kapcs(){
        for (const egitest of this.egitestei) {
            egitest.svgnyil.classList.toggle('lathatatlan');
        }
        for (const egitest of this.nem_kezelt_egitestei) {
            egitest.svgnyil.classList.toggle('lathatatlan');
        }
    }

    /**
     * Ez a metódus kezeli az égitestek közötti ütközéseket a galaxisban. Ha két égitest ütközik, akkor az egyik égitest beolvasztja a másikat, és az összeolvadás eredményeként egy új égitest jön létre. A beolvasztott égitestet eltávolítja a galaxisból.
     * @returns {void}
     */
    utkozeses_kolcsonhatas(){
        for (let i = 0; i < this.egitestei.length; i++) {
            for (let j = i+1; j < this.egitestei.length; j++) {
                if (this.egitestei[i].utkozik(this.egitestei[j])){
                    this.egitestei[i].beolvaszt(this.egitestei[j]);
                    console.log(this.egitestei);
                }
            }
        }
    }

    /**
     * Ez a metódus számítja ki a gravitációs kölcsönhatást az égitestek között a galaxisban. A gravitációs kölcsönhatás során minden égitest vonzza a többi égitestet, és ennek hatására megváltozik az égitestek sebessége. A metódus frissíti az égitestek sebességvektorait a gravitációs erők alapján.
     * @returns {void}
     */
    gravitacios_kolcsonhatas(){
        for (let i = 0; i < this.egitestei.length; i++) {
            for (let j = i+1; j < this.egitestei.length; j++) {
                const[u,v] = Egitest.gravitacios_kolcsonhatas_parra(this.egitestei[i], this.egitestei[j]);
                this.egitestei[i].v.hozzaad(u);
                this.egitestei[j].v.hozzaad(v);
            }
        }
    }

    /**
     * Ez a metódus mozgatja az összes égitestet a galaxisban a sebességvektoruk alapján. A metódus frissíti az égitestek pozícióját a sebességvektorok alapján, és így az égitestek mozgásban lesznek a galaxisban.
     * @returns {void}
     */
    mozgat(){
        for (const egitest of this.egitestei) {
            egitest.mozogj();
        }
    }

    /**
     * Ez a metódus visszaállítja a galaxis égitestjeit az eredeti állapotukba. A metódus eltávolítja az összes nem eredeti égitestet a galaxisból, és az eredeti égitesteket visszaállítja az eredeti pozíciójukba és sebességükbe. Ez a metódus akkor kell, ha a galaxis szimulációját újra szeretnénk kezdeni az eredeti állapotból.
     * @returns {void}
     */
    reset(){
        var torlendo = [];
        for (const egitest of this.egitestei) {
            if (!egitest.eredeti){
                torlendo.push(egitest);
            }
            else{
                egitest.pv_inic();
                egitest.svg_nyil_update();
            }
        }
        for (const egitest of torlendo) {
            egitest.torol();   
        }
        for (const egitest of this.nem_kezelt_egitestei) {
            if (egitest.eredeti){
                egitest.pv_inic();
                egitest.svg_nyil_update();
                egitest.lerajzol();
                this.egitestei.push(egitest);
            }            
        }
        this.nem_kezelt_egitestei = [];
    }
}