import { Galaxis } from "./galaxis";
import { Vektor } from "./vektor";

export class Egitest {
    nev: string;
    tomeg: number;
    belszin: string;
    kulszin: string;
    svgobject: SVGElement;
    galaxis: Galaxis;

    p: Vektor;
    v: Vektor;

    constructor(nev: string, tomeg: number, p: Vektor, v: Vektor, belszin: string, kulszin: string, galaxis: Galaxis) {
        this.nev = nev;
        this.tomeg = tomeg;
        this.belszin = belszin;
        this.kulszin = kulszin;
        this.p = p;
        this.v = v;
        this.svgobject = this.svgbe();
        this.galaxis = galaxis;
        galaxis.egitestei.push(this);
    }

    mozogj() {
        this.p.hozzaad(this.v);
        this.frissit();
    }

    frissit() {
        this.svgobject.setAttribute("cx", this.p.x.toString());
        this.svgobject.setAttribute("cy", this.p.y.toString());
    }

    static gravitacios_kolcsonhatas(egitestek: Egitest[]) {
        for (let i = 0; i < egitestek.length; i++) {
            for (let j = i + 1; j < egitestek.length; j++) {
                const [u, v] = this.gravitacios_kolcsonhatas_parra(egitestek[i], egitestek[j]);
                egitestek[i].v.hozzaad(u);
                egitestek[j].v.hozzaad(v);
            }
        }
    }

    static gamma = 0.9;

    static gravitacios_kolcsonhatas_parra(e: Egitest, f: Egitest): [Vektor, Vektor] {
        const f_bol_e_be_mutato_vektor = Vektor.kivon(e.p, f.p);
        const rnegyzet = f_bol_e_be_mutato_vektor.hossznegyzet();
        const r = Math.sqrt(rnegyzet);
        const egysegvektor_f = Vektor.szamoszt(f_bol_e_be_mutato_vektor, r);
        const egysegvektor_e = Vektor.ellentett(egysegvektor_f);
        const cucc = Egitest.gamma / rnegyzet;
        const elmozdulas_e = Vektor.szamszoroz(egysegvektor_e, cucc * f.tomeg);
        const elmozdulas_f = Vektor.szamszoroz(egysegvektor_f, cucc * e.tomeg);
        return [elmozdulas_e, elmozdulas_f];
    }

    svgbe(): SVGCircleElement {
        const svgo = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        // <circle/>
        svgo.setAttribute("cx", this.p.x.toString());
        svgo.setAttribute("cy", this.p.y.toString());
        svgo.setAttribute("r", Math.sqrt(this.tomeg).toString());
        svgo.setAttribute("stroke", this.kulszin);
        svgo.setAttribute("stroke-width", "2");
        svgo.setAttribute("fill", this.belszin);
        // svgobject.setAttribute('id', "bela");
        return svgo;
    }
}
