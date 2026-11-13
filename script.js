
// SZIMULÁCIÓHOZ HASZNÁLT VÁLTOZÓK DEKLARÁCIÓJA

let galaxis = new Galaxis("Kistejút")
let m1 = new Egitest("m1", 100, new Vektor(-97.000436, 24.308753), new Vektor(0.4662036850, 0.4323657300), "#FF0000", "#FF0000", galaxis);
let m2 = new Egitest("m2", 100, new Vektor(0, 0), new Vektor(-0.93240737, -0.86473146), "#0000FF", "#0000FF", galaxis);
let m3 = new Egitest("m3", 100, new Vektor(97.000436, -24.308753), new Vektor(0.4662036850, 0.4323657300), "#00FF00", "#00FF00", galaxis);


/**
 * Az ide írd kód a szimuláció indításakor fut le. 
 */
function inicializalas(){
    
}

/**
 * Az ide írd kód a szimuláció minden egyes lépésében fut le.
 */
function szimulacios_lepes(){
    galaxis.utkozeses_kolcsonhatas();
    galaxis.gravitacios_kolcsonhatas();
    galaxis.mozgat();
}

// ------------------- Animációkezelés a motorháztető alatt --------------------

let globalID;
let running = false;


/**
 * Ez a függvény felelős a szimuláció frissítéséért és a következő animációs képkocka kéréseért. A requestAnimationFrame metódus segítségével hívja meg újra önmagát, így folyamatosan frissíti a szimulációt, amíg a futás engedélyezett.
 * @returns {void}
 */
function update() {
    szimulacios_lepes();
    globalID = requestAnimationFrame(update);
}

startbtn.addEventListener("click", start);
stopbtn.addEventListener("click", animacio_leallitasa);
resetbtn.addEventListener("click", () => galaxis.reset());
sulypontbtn.addEventListener("click", sulypontReset);
bolygobtn.addEventListener("click", bolygo_letevese);

vaszon.addEventListener("wheel", nagyit);



/**
 * Ez a függvény kezeli a vászon nagyítását és kicsinyítését az egér görgőjének használatával. Ha a görgőt felfelé tekerjük, a vászon nagyítódik, ha lefelé, akkor kicsinyedik. A viewBox attribútum módosításával történik a nagyítás és kicsinyítés.
 * @param {WheelEvent} e
 */
function nagyit(e){
    const c = 1.1;
    if (e.deltaY < 0){
        console.log(vaszon.viewBox);
        vaszon.setAttribute('viewBox', `${vaszon.viewBox.animVal.x/c} ${vaszon.viewBox.animVal.y/c} ${vaszon.viewBox.animVal.width/c} ${vaszon.viewBox.animVal.height/c}`);
    } else if (e.deltaY > 0){
        vaszon.setAttribute('viewBox', `${vaszon.viewBox.animVal.x*c} ${vaszon.viewBox.animVal.y*c} ${vaszon.viewBox.animVal.width*c} ${vaszon.viewBox.animVal.height*c}`);
    }
}

/**
 * Ez a függvény indítja el a szimulációt. 
 * @returns {void}
 */
function start(){
    inicializalas();
    animacio_inditasa();
}

/**
 * Ez a függvény indítja el a szimulációt, ha az még nem fut. A requestAnimationFrame metódus segítségével hívja meg az update függvényt, amely frissíti a szimulációt és kéri a következő animációs képkockát. A running változó jelzi, hogy a szimuláció jelenleg fut-e.
 * @returns {void}
 */
function animacio_inditasa() {
    if (!running) {
        globalID = requestAnimationFrame(update);
        running = true;
        galaxis.nyillathatosag_kapcs();        
    }
}


/**
 * Ez a függvény leállítja a szimulációt, ha az jelenleg fut. A cancelAnimationFrame metódus segítségével megszakítja a requestAnimationFrame hívást, így leállítja az update függvény folyamatos hívását. A running változó jelzi, hogy a szimuláció jelenleg fut-e.
 * @returns {void}
 */
function animacio_leallitasa() {
    if (running) {
        cancelAnimationFrame(globalID);
        running = false;
        galaxis.nyilak_update();
        galaxis.nyillathatosag_kapcs();
    }
}


/**
 * Ez a függvény visszaállítja a galaxis súlypontját az origóba. A galaxis súlypontját a galaxis.sulypont() metódus számítja ki, majd a galaxis.eltolas() metódus segítségével eltolja az összes égitestet az ellentett vektorral, így a súlypont az origóba kerül.
 */
function sulypontReset() {
    let s = galaxis.sulypont();
    galaxis.eltolas(Vektor.ellentett(s));
}


vaszon.addEventListener("mousedown", bolygo_poziciojanak_megadasa, false);
vaszon.addEventListener("mouseup", bolygo_sebessegenek_megadasa, false);

let innen = new Vektor(0,0);
let ide = new Vektor(0,0);

/**
 * Ez a függvény kezeli az égitest pozíciójának megadását az egérrel történő kattintás alapján. Amikor az egérgombot lenyomják a vásznon, a függvény meghívódik, és a cursorPoint() metódus segítségével lekéri az egér kurzor aktuális pozícióját a vászon koordinátarendszerében. Ezután létrehoz egy új Vektor objektumot az aktuális pozícióval, és frissíti a px és py input mezők értékét a vektor x és y komponenseivel.
 * @param {MouseEvent} evt
 * @returns {void}
 */
function bolygo_poziciojanak_megadasa(evt) {
    let cursorpt = cursorPoint(evt);
    innen = new Vektor(cursorpt.x, cursorpt.y);
    px.value = innen.x;
    py.value = innen.y;
}

/**
 * Ez a függvény kezeli az égitest sebességének megadását az egérrel történő kattintás alapján. Amikor az egérgombot felengedik a vásznon, a függvény meghívódik, és a cursorPoint() metódus segítségével lekéri az egér kurzor aktuális pozícióját a vászon koordinátarendszerében. Ezután létrehoz egy új Vektor objektumot az aktuális pozícióval, majd kiszámítja a sebességvektort az ide és innen vektorok különbségeként. A sebességvektor komponenseit (x és y) elosztja 100-zal, majd frissíti a vx és vy input mezők értékét a sebességvektor x és y komponenseivel.
 * @param {MouseEvent} evt
 * @returns {void}
 */
function bolygo_sebessegenek_megadasa(evt) {
    let cursorpt = cursorPoint(evt);
    ide = new Vektor(cursorpt.x, cursorpt.y);
    let v = Vektor.minus(ide,innen);
    v = v.oszt(100);
    vx.value = v.x;
    vy.value = v.y;
}

/**
 * Ez a függvény létrehoz egy új égitestet a megadott paraméterek alapján, és hozzáadja azt a galaxis égitestjeihez. A pozíciót és sebességet a px, py, vx és vy input mezők értékei alapján állítja be, majd létrehoz egy új Egitest objektumot a megadott névvel, tömeggel, pozícióval, sebességgel és színekkel. Ha a szimuláció jelenleg fut, akkor a létrehozott égitest nyilát láthatatlanná teszi.
 * @returns {void}
 */
function bolygo_letevese(){
    let p = new Vektor(parseFloat(px.value), parseFloat(py.value));
    let v = new Vektor(parseFloat(vx.value), parseFloat(vy.value));
    let bolygocska = new Egitest(bolygonev.value, parseFloat(tomeg.value), p, v, egitest_belszin.value, egitest_kulszin.value, galaxis);
    if(running){
        bolygocska.svgnyil.classList.toggle('lathatatlan');
    }
}
    
/**
 * Ez a függvény visszaadja az egér kurzor aktuális pozícióját a vászon koordinátarendszerében. A cursorPoint() metódus létrehoz egy új SVGPoint objektumot, majd beállítja az x és y koordinátákat az egér esemény clientX és clientY értékeire. Ezután a matrixTransform() metódus segítségével átalakítja a pontot a vászon koordinátarendszerébe, és visszaadja az eredményt.
 * @param {MouseEvent} evt
 * @returns {DOMPoint}
 */
function cursorPoint(evt) {
    let pt = vaszon.createSVGPoint();
    pt.x = evt.clientX; 
    pt.y = evt.clientY;    
    return pt.matrixTransform(vaszon.getScreenCTM().inverse());
}