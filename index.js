(() => {
  // vektor.ts
  var PolarVektor = class _PolarVektor {
    f;
    r;
    constructor(f, r) {
      this.f = f;
      this.r = r;
    }
    forgatott(f) {
      return new _PolarVektor(this.f + f, this.r);
    }
    cartesian() {
      let radf = to_radian(this.f);
      return new Vektor(this.r * Math.cos(radf), this.r * Math.sin(radf));
    }
  };
  function to_degree(radian) {
    return radian * 180 / Math.PI;
  }
  function to_radian(radian) {
    return radian * Math.PI / 180;
  }
  var Vektor = class _Vektor {
    x;
    y;
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
    static osszead(u, v) {
      return new _Vektor(u.x + v.x, u.y + v.y);
    }
    hozzaad(that) {
      this.x += that.x;
      this.y += that.y;
      return this;
    }
    static kivon(u, v) {
      return new _Vektor(u.x - v.x, u.y - v.y);
    }
    static ellentett(u) {
      return new _Vektor(-u.x, -u.y);
    }
    static balraforgat90(u) {
      return new _Vektor(-u.y, u.x);
    }
    static jobbraforgat90(u) {
      return new _Vektor(u.y, -u.x);
    }
    static szamszoroz(u, a) {
      return new _Vektor(u.x * a, u.y * a);
    }
    leosztja(a) {
      this.x /= a;
      this.y /= a;
    }
    static szamoszt(u, a) {
      return new _Vektor(u.x / a, u.y / a);
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
    static forgatott(u, fok) {
      return u.polar().forgatott(fok).cartesian();
    }
    egysegvektora() {
      return new _Vektor(this.x / this.hossz(), this.y / this.hossz());
    }
  };

  // egitest.ts
  var Egitest = class _Egitest {
    nev;
    tomeg;
    belszin;
    kulszin;
    svgobject;
    galaxis;
    p;
    v;
    constructor(nev, tomeg2, p, v, belszin, kulszin, galaxis2) {
      this.nev = nev;
      this.tomeg = tomeg2;
      this.belszin = belszin;
      this.kulszin = kulszin;
      this.p = p;
      this.v = v;
      this.svgobject = this.svgbe();
      this.galaxis = galaxis2;
      galaxis2.egitestei.push(this);
    }
    mozogj() {
      this.p.hozzaad(this.v);
      this.frissit();
    }
    frissit() {
      this.svgobject.setAttribute("cx", this.p.x.toString());
      this.svgobject.setAttribute("cy", this.p.y.toString());
    }
    static gravitacios_kolcsonhatas(egitestek) {
      for (let i = 0; i < egitestek.length; i++) {
        for (let j = i + 1; j < egitestek.length; j++) {
          const [u, v] = this.gravitacios_kolcsonhatas_parra(egitestek[i], egitestek[j]);
          egitestek[i].v.hozzaad(u);
          egitestek[j].v.hozzaad(v);
        }
      }
    }
    static gamma = 0.9;
    static gravitacios_kolcsonhatas_parra(e, f) {
      const f_bol_e_be_mutato_vektor = Vektor.kivon(e.p, f.p);
      const rnegyzet = f_bol_e_be_mutato_vektor.hossznegyzet();
      const r = Math.sqrt(rnegyzet);
      const egysegvektor_f = Vektor.szamoszt(f_bol_e_be_mutato_vektor, r);
      const egysegvektor_e = Vektor.ellentett(egysegvektor_f);
      const cucc = _Egitest.gamma / rnegyzet;
      const elmozdulas_e = Vektor.szamszoroz(egysegvektor_e, cucc * f.tomeg);
      const elmozdulas_f = Vektor.szamszoroz(egysegvektor_f, cucc * e.tomeg);
      return [elmozdulas_e, elmozdulas_f];
    }
    svgbe() {
      const svgo = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      svgo.setAttribute("cx", this.p.x.toString());
      svgo.setAttribute("cy", this.p.y.toString());
      svgo.setAttribute("r", Math.sqrt(this.tomeg).toString());
      svgo.setAttribute("stroke", this.kulszin);
      svgo.setAttribute("stroke-width", "2");
      svgo.setAttribute("fill", this.belszin);
      return svgo;
    }
  };

  // galaxis.ts
  var Galaxis = class {
    nev;
    egitestei;
    constructor(nev) {
      this.nev = nev;
      this.egitestei = [];
    }
    eltolas(v) {
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
  };

  // script.ts
  var galaxis = new Galaxis("Kistej\xFAt");
  var napocska = new Egitest("Nap", 100, new Vektor(0, 0), new Vektor(1, 1), "#FF0000", "#000000", galaxis);
  var foldecske = new Egitest("F\xF6ld", 10, new Vektor(-10, 30), new Vektor(-1, 1), "#0000FF", "#000000", galaxis);
  var holdacska = new Egitest("Hold", 5, new Vektor(-15, 50), new Vektor(1, -1), "#999999", "#000000", galaxis);
  var vaszon = document.getElementById("vaszon");
  var bolygonev = document.getElementById("bolygonev");
  var vx = document.getElementById("vx");
  var vy = document.getElementById("vy");
  var px = document.getElementById("px");
  var py = document.getElementById("py");
  var tomeg = document.getElementById("tomeg");
  var egitest_belszin = document.getElementById("egitest_belszin");
  var egitest_kulszin = document.getElementById("egitest_kulszin");
  var startbtn = document.getElementById("startbtn");
  var stopbtn = document.getElementById("stopbtn");
  var sulypontbtn = document.getElementById("sulypontbtn");
  function inicializalas() {
    vaszon.appendChild(napocska.svgobject);
    vaszon.appendChild(foldecske.svgobject);
    vaszon.appendChild(holdacska.svgobject);
  }
  function szimulacios_lepes() {
    Egitest.gravitacios_kolcsonhatas(galaxis.egitestei);
    for (const egitest of galaxis.egitestei) {
      egitest.mozogj();
    }
  }
  var globalID;
  var running = false;
  function update() {
    szimulacios_lepes();
    globalID = requestAnimationFrame(update);
  }
  startbtn.addEventListener("click", start);
  stopbtn.addEventListener("click", animationStop);
  sulypontbtn.addEventListener("click", sulypontReset);
  function start() {
    inicializalas();
    animationStart();
  }
  function animationStart() {
    if (!running) {
      globalID = requestAnimationFrame(update);
      running = true;
    }
  }
  function animationStop() {
    if (running) {
      cancelAnimationFrame(globalID);
      running = false;
    }
  }
  function sulypontReset() {
    const s = galaxis.sulypont();
    console.log(s);
    galaxis.eltolas(Vektor.ellentett(s));
  }
  vaszon.addEventListener("mousedown", bolygo_letevese, false);
  function bolygo_letevese(evt) {
    const cursorpt = cursorPoint(evt);
    const p = new Vektor(cursorpt.x, cursorpt.y);
    px.value = p.x.toString();
    py.value = p.y.toString();
    const v = new Vektor(parseFloat(vx.value), parseFloat(vy.value));
    const bolygocska = new Egitest(bolygonev.value, parseFloat(tomeg.value), p, v, egitest_belszin.value, egitest_kulszin.value, galaxis);
    vaszon.appendChild(bolygocska.svgobject);
  }
  function cursorPoint(evt) {
    const pt = vaszon.createSVGPoint();
    pt.x = evt.clientX;
    pt.y = evt.clientY;
    return pt.matrixTransform(vaszon.getScreenCTM().inverse());
  }
})();
