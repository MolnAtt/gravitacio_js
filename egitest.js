class Egitest{
    /**
     * Létrehoz egy új égitestet a megadott paraméterekkel. A pozíció és a sebesség vektorokat klónozza, így az égitest belső állapota nem változik meg a paraméterek változásával.
     * @param {string} nev A bolygó neve. A bolygó neve a bolygó tömegének súlyozott átlaga lesz, ha két égitest összeolvad. A súlyozás az égitestek tömegén alapul. A súlyozott átlagot a Egitest.nevatlag() függvény számítja ki.
     * @param {number} tomeg A bolygó tömege.
     * @param {Vektor} p pozícióvektor
     * @param {Vektor} v sebességvektor
     * @param {string} belszin Ez a szín a bolygó kitöltésének színe lesz. A körvonal színe a kulszin paraméterben megadott szín lesz.
     * @param {string} kulszin Ez a szín a bolygó körvonalának színe lesz. A belső szín a bolygó kitöltésének színe lesz. 
     * @param {Galaxis} galaxis Minden egitest egy galaxisban van, a galaxis az égitestek listáját tartalmazza. Fontos számon tartani azt is, hogy az égitestek a galaxisban vannak, mert a galaxis felelős az égitestek közötti gravitációs kölcsönhatásokért és ütközésekért.
     * @param {boolean} eredeti Ez a paraméter azt jelzi, hogy az égitest eredeti-e, vagy egy összeolvadás eredménye. Ha az égitest összeolvad egy másik égitesttel, akkor az új égitest nem lesz eredeti, és a galaxis nem fogja kezelni az új égitestet. Az eredeti égitestek a galaxisban vannak, és a galaxis felelős az égitestek közötti gravitációs kölcsönhatásokért és ütközésekért. 
     */
    constructor(nev, tomeg, p, v, belszin, kulszin, galaxis, eredeti=true){
        this.nev = nev;
        this.tomeg = tomeg;
        this.belszin = belszin;
        this.kulszin = kulszin;
        this.eredeti = eredeti;
        this.kezdopozicio = [p, v];
        this.svgnyil = this.svg_nyil_letrehozasa();
        this.svgobject = this.svg_bolygo_letrehozasa(p);
        this.pv_inic();
        this.svg_nyil_update();
        this.lerajzol();
        this.galaxis = galaxis;
        galaxis.egitestei.push(this);
        this.svgobject.addEventListener('contextmenu', e => {e.preventDefault(); e.stopPropagation(); this.torol()});
    }

    /**
     * Törli az égitestet a galaxisból és a DOM-ból.
     * @returns {void}
     */
    torol(){
        this.svgnyil.remove();
        this.svgobject.remove();
        this.galaxis.egitestei.splice(this.galaxis.egitestei.indexOf(this),1);
        delete this;
    }

    /**
     * Lerajzolja az égitestet a vászonra. A nyilat és a bolygót is hozzáadja a DOM-hoz.
     * @returns {void}
     */
    lerajzol(){
        vaszon.appendChild(this.svgnyil);
        vaszon.appendChild(this.svgobject);
    }

    /**
     * Inicializálja az égitest pozícióját és sebességét a kezdőpozíció alapján. A kezdőpozíció egy tömb, amely két Vektor objektumot tartalmaz: az első a pozíciót, a második a sebességet.
     * @returns {void}
     */
    pv_inic(){
        this.svgobject.setAttribute('cx', this.kezdopozicio[0].x);
        this.svgobject.setAttribute('cy', this.kezdopozicio[0].y);
        this.p = this.kezdopozicio[0].masolat();
        this.v = this.kezdopozicio[1].masolat();
    }

    /**
     * Mozgatja az égitestet a sebessége alapján. A pozíciót a sebesség vektorával növeli, majd frissíti a rajzot.
     * @returns {void}
     */
    mozogj(){
        this.p.hozzaad(this.v);
        this.frissit();
    }

    /**
     * 
     * @param {Egitest} egitest 
     * @returns {boolean}
     */
    utkozik(egitest){
        const tavolsagnegyzet = Vektor.minus(this.p, egitest.p).hossznegyzet();
        const sugarosszeg = Math.sqrt(this.tomeg) + Math.sqrt(egitest.tomeg);
        const sugarosszegnegyzet = sugarosszeg * sugarosszeg;
        return tavolsagnegyzet < sugarosszegnegyzet;
    }

    // under the hood színkeverés HSL színtérben, nem kell érteni, hex kód megy be, hex kódot ad ki (by ChatGPT)
    static szinkever(color1, color2, ratio) {
        ratio = Math.max(0, Math.min(1, ratio)); // Ensure ratio is between 0 and 1
    
        // Convert hex to HSL
        const hexToHsl = (hex) => {
            const bigint = parseInt(hex.slice(1), 16);
            const r = (bigint >> 16) & 255;
            const g = (bigint >> 8) & 255;
            const b = bigint & 255;
    
            const normalizedR = r / 255;
            const normalizedG = g / 255;
            const normalizedB = b / 255;
    
            const max = Math.max(normalizedR, normalizedG, normalizedB);
            const min = Math.min(normalizedR, normalizedG, normalizedB);
    
            let h, s, l = (max + min) / 2;
    
            if (max === min) {
                h = s = 0; // achromatic
            } else {
                const d = max - min;
                s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                switch (max) {
                    case normalizedR:
                        h = (normalizedG - normalizedB) / d + (normalizedG < normalizedB ? 6 : 0);
                        break;
                    case normalizedG:
                        h = (normalizedB - normalizedR) / d + 2;
                        break;
                    case normalizedB:
                        h = (normalizedR - normalizedG) / d + 4;
                        break;
                }
                h /= 6;
            }
    
            return { h, s, l };
        };
    
        // Interpolate in HSL
        const hsl1 = hexToHsl(color1);
        const hsl2 = hexToHsl(color2);
    
        const hueDiff = hsl2.h - hsl1.h;
    
        if (Math.abs(hueDiff) > 0.5) {
            // Ensure that interpolation goes the shortest way around the color wheel
            hsl2.h -= Math.sign(hueDiff);
        }
    
        const blendedHsl = {
            h: hsl1.h + hueDiff * ratio,
            s: hsl1.s + (hsl2.s - hsl1.s) * ratio,
            l: hsl1.l + (hsl2.l - hsl1.l) * ratio
        };
    
        // Convert back to hex
        const hslToHex = (hsl) => {
            const hueToRgb = (p, q, t) => {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1 / 6) return p + (q - p) * 6 * t;
                if (t < 1 / 2) return q;
                if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                return p;
            };
    
            const { h, s, l } = hsl;
            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            const r = hueToRgb(p, q, h + 1 / 3);
            const g = hueToRgb(p, q, h);
            const b = hueToRgb(p, q, h - 1 / 3);
    
            const componentToHex = (c) => {
                const hex = Math.round(c * 255).toString(16);
                return hex.length === 1 ? "0" + hex : hex;
            };
    
            return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;
        };
    
        return hslToHex(blendedHsl);
    }

    /**
     * Kiszámítja két név "súlyozott átlagát". Akkor használható, ha két égitest összeolvad, és az új égitest neve a két eredeti név súlyozott átlaga lesz. A súlyozás az égitestek tömegén alapul.
     * @param {string} nev1 
     * @param {number} suly1 
     * @param {string} nev2 
     * @param {number} suly2 
     * @returns {string}
     */
    static nevatlag(nev1, suly1, nev2, suly2) {
        const nev1hossz = nev1.length;
        const nev2hossz = nev2.length;
        const ujnevhossz = Math.round((nev1hossz * suly1 + nev2hossz * suly2) / (suly1 + suly2));
        var ujnev = "";
        for (let i = 0; i < ujnevhossz; i++) {
            ujnev += String.fromCharCode((nev1.charCodeAt(i) * suly1 + nev2.charCodeAt(i) * suly2) / (suly1 + suly2));
        }
        return ujnev;
    }

    /**
     * Beolvasztja a paraméterként kapott égitestet az aktuális égitestbe. A két égitest összeolvad, és egy új égitest jön létre, amelynek tömege, pozíciója, sebessége és színe a két eredeti égitest súlyozott átlaga lesz. Az új égitestet visszaadja.
     * @param {Egitest} egitest 
     * @returns {Egitest}
     */
    beolvaszt(egitest){
        const uj_tomeg = this.tomeg+egitest.tomeg;
        const uj_p = Vektor.oszt(Vektor.plus(Vektor.szor(this.p, this.tomeg), Vektor.szor(egitest.p, egitest.tomeg)), uj_tomeg);
        const uj_v = Vektor.oszt(Vektor.plus(Vektor.szor(this.v, this.tomeg), Vektor.szor(egitest.v, egitest.tomeg)), uj_tomeg); 
        const uj_belszin = Egitest.szinkever(this.belszin, egitest.belszin, egitest.tomeg/uj_tomeg);
        const uj_kulszin = Egitest.szinkever(this.kulszin, egitest.kulszin, egitest.tomeg/uj_tomeg);
        const uj_nev = Egitest.nevatlag(this.nev, this.tomeg, egitest.nev, egitest.tomeg);

        const uj_bolygo = new Egitest(uj_nev, uj_tomeg, uj_p, uj_v, uj_belszin, uj_kulszin, this.galaxis, false);

        // hozzáadás a nem kezeltekhez
        this.galaxis.nem_kezelt_egitestei.push(this);
        egitest.galaxis.nem_kezelt_egitestei.push(egitest);
        // törlés a kezeltekből
        this.galaxis.egitestei.splice(this.galaxis.egitestei.indexOf(this),1);
        egitest.galaxis.egitestei.splice(egitest.galaxis.egitestei.indexOf(egitest),1);
        // törlés a DOM-ból
        this.svgnyil.remove();
        this.svgobject.remove();
        egitest.svgnyil.remove();
        egitest.svgobject.remove();

        uj_bolygo.svgnyil.classList.toggle('lathatatlan');
        return uj_bolygo;
    }


    /**
     * Frissíti az égitest pozícióját a DOM-ban a belső pozíció vektor alapján. 
     * A bolygó és a nyíl pozícióját is frissíti.
     * @returns {void}
     */
    frissit(){
        this.svgobject.setAttribute('cx', this.p.x);
        this.svgobject.setAttribute('cy', this.p.y);
    }

    static gamma = 1;

    /**
     * Ez a függvény visszaadja a bemenő égitestekre ható KÉT erőt.
     * @param {Egitest} e 
     * @param {Egitest} f 
     * @returns {[Vektor,Vektor]}
     */
    static gravitacios_kolcsonhatas_parra(e, f){
        const f_bol_e_be_mutato_vektor = Vektor.minus(e.p,f.p);
        const rnegyzet = f_bol_e_be_mutato_vektor.hossznegyzet();
        const r = Math.sqrt(rnegyzet);
        const egysegvektor_f = Vektor.oszt(f_bol_e_be_mutato_vektor, r);
        const egysegvektor_e = Vektor.ellentett(egysegvektor_f);
        const cucc = Egitest.gamma/rnegyzet;
        const elmozdulas_e = Vektor.szor(egysegvektor_e,cucc*f.tomeg);
        const elmozdulas_f = Vektor.szor(egysegvektor_f,cucc*e.tomeg);
        return [elmozdulas_e, elmozdulas_f];
    }


    /**
     * Létrehoz egy SVG kör elemet a bolygó számára a megadott pozícióban.
     * @param {Vektor} p 
     * @returns {SVGCircleElement}
     */
    svg_bolygo_letrehozasa(p){
        let svgo = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
        svgo.setAttribute('r', Math.sqrt(this.tomeg));
        svgo.setAttribute('stroke', this.kulszin);
        svgo.setAttribute('stroke-width', '2');
        svgo.setAttribute('fill', this.belszin);

        return svgo;
    }
    /**
     * Létrehoz egy SVG nyíl elemet a bolygó sebességének vizualizálására.
     * @returns {SVGPathElement}
     */
    svg_nyil_letrehozasa(){
        let svgnyil = document.createElementNS("http://www.w3.org/2000/svg", 'path');
        svgnyil.setAttribute('marker-end', 'url(#head)');
        svgnyil.setAttribute('stroke-width', 2);
        svgnyil.setAttribute('fill', 'none');
        svgnyil.setAttribute('stroke', 'gray');
        svgnyil.setAttribute('stroke-width', '2');
        return svgnyil;
    }

    /**
     * Frissíti az égitesthez tartozó SVG nyíl pozícióját a bolygó aktuális pozíciója és sebessége alapján.
     * @returns {void}
     */
    svg_nyil_update(){
        this.svgnyil.setAttribute('d', `M${this.p.x},${this.p.y} ${this.p.x+this.v.x*100},${this.p.y+this.v.y*100}`);
    }
}
