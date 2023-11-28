export class PolarVektor {
    f: number;
    r: number;

    constructor(f: number, r: number) {
        this.f = f;
        this.r = r;
    }

    forgatott(f: number) {
        return new PolarVektor(this.f + f, this.r);
    }

    cartesian() {
        let radf = to_radian(this.f);
        return new Vektor(this.r * Math.cos(radf), this.r * Math.sin(radf));
    }
}

function to_degree(radian: number) {
    return (radian * 180) / Math.PI;
}

function to_radian(radian: number) {
    return (radian * Math.PI) / 180;
}

export class Vektor {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    static osszead(u: Vektor, v: Vektor) {
        return new Vektor(u.x + v.x, u.y + v.y);
    }

    hozzaad(that: Vektor) {
        this.x += that.x;
        this.y += that.y;
        return this;
    }

    static kivon(u: Vektor, v: Vektor) {
        return new Vektor(u.x - v.x, u.y - v.y);
    }

    static ellentett(u: Vektor) {
        return new Vektor(-u.x, -u.y);
    }

    static balraforgat90(u: Vektor) {
        return new Vektor(-u.y, u.x);
    }

    static jobbraforgat90(u: Vektor) {
        return new Vektor(u.y, -u.x);
    }

    static szamszoroz(u: Vektor, a: number) {
        return new Vektor(u.x * a, u.y * a);
    }

    leosztja(a: number) {
        this.x /= a;
        this.y /= a;
    }

    static szamoszt(u: Vektor, a: number) {
        return new Vektor(u.x / a, u.y / a);
    }

    polar() {
        return new PolarVektor(to_degree(Math.atan2(this.y, this.x)), this.hossz());
    }

    hossz() {
        return Math.sqrt(this.hossznegyzet());
    }

    hossznegyzet() {
        return this.x ** 2 + this.y ** 2;
    }

    static forgatott(u: Vektor, fok: number) {
        return u.polar().forgatott(fok).cartesian();
    }

    egysegvektora() {
        return new Vektor(this.x / this.hossz(), this.y / this.hossz());
    }
}

// u = new Vektor(5, 4);
// v = new Vektor(2, 1);

// u.hozzaad(v);
// Vektor.osszead(u, v);
