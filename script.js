
// SZIMULÁCIÓHOZ HASZNÁLT VÁLTOZÓK DEKLARÁCIÓJA

let galaxis = new Galaxis("Kistejút")

function inicializalas(){
    
}

function szimulacios_lepes(){
    Egitest.gravitacios_kolcsonhatas(galaxis.egitestei);
    for (const egitest of galaxis.egitestei) {
        egitest.mozogj();
    }
}

// --------------------------------- Motorháztető alatt -----------------------------------------------

let globalID;
let running = false;


function update() {
    szimulacios_lepes();
    globalID = requestAnimationFrame(update);
}

startbtn.addEventListener("click", start);
stopbtn.addEventListener("click", animationStop);
sulypontbtn.addEventListener("click", sulypontReset);
bolygobtn.addEventListener("click", bolygo_letevese);

function start(){
    inicializalas();
    animationStart();
}

function animationStart() {
    if (!running) {
        globalID = requestAnimationFrame(update);
        running = true;
    }
}


// kéne még az, hogy ilyenkor minden nyil toggle lathatatlan
// kéne még az, hogy minden nyil pozicio update
function animationStop() {
    if (running) {
        cancelAnimationFrame(globalID);
        running = false;
    }
}

function sulypontReset() {
    let s = galaxis.sulypont();
    console.log(s);
    galaxis.eltolas(Vektor.ellentett(s));

}






vaszon.addEventListener("mousedown", bolygo_poziciojanak_megadasa, false);
vaszon.addEventListener("mouseup", bolygo_sebessegenek_megadasa, false);

let globalis_kattintasszamlalo_valtozo = 0;

//  első kattintás p-t állít
// második kattintás v-t állít
// külön gomb pakolja le a bolygót, ha ez jó.

let innen = new Vektor(0,0);
let ide = new Vektor(0,0);

function bolygo_poziciojanak_megadasa(evt) {
    let cursorpt = cursorPoint(evt);
    innen = new Vektor(cursorpt.x, cursorpt.y);
    px.value = innen.x;
    py.value = innen.y;
}

function bolygo_sebessegenek_megadasa(evt) {
    let cursorpt = cursorPoint(evt);
    ide = new Vektor(cursorpt.x, cursorpt.y);
    let v = Vektor.kivon(ide,innen);
    v.leosztja(100);
    vx.value = v.x;
    vy.value = v.y;
}

function bolygo_letevese(){
    let p = new Vektor(parseFloat(px.value), parseFloat(py.value));
    let v = new Vektor(parseFloat(vx.value), parseFloat(vy.value));
    let bolygocska = new Egitest(bolygonev.value, parseFloat(tomeg.value), p, v, egitest_belszin.value, egitest_kulszin.value, galaxis);
    vaszon.appendChild(bolygocska.svgobject);
    vaszon.appendChild(bolygocska.svgnyil);
    if(running){
        bolygocska.svgnyil.classList.toggle('lathatatlan');
    }
}
    
function cursorPoint(evt) {
    let pt = vaszon.createSVGPoint();
    pt.x = evt.clientX; 
    pt.y = evt.clientY;    
    return pt.matrixTransform(vaszon.getScreenCTM().inverse());
}