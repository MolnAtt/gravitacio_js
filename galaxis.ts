import { Egitest } from "./egitest";
import { Vektor } from "./vektor";

export class Galaxis {
    nev: string;
    egitestei: Egitest[];

    constructor(nev: string) {
        this.nev = nev;
        this.egitestei = [];
    }

    eltolas(v: Vektor) {
        for (const egitest of this.egitestei) {
            egitest.p.hozzaad(v);
        }
    }

    sulypont() {
        const result = new Vektor(0, 0);
        console.log(result);
        for (const egitest of this.egitestei) {
            result.hozzaad(egitest.p);
        }
        result.leosztja(this.egitestei.length);
        return result;
    }
}
