
// SZIMULÁCIÓHOZ HASZNÁLT VÁLTOZÓK DEKLARÁCIÓJA

let galaxis = new Galaxis("Kistejút")
let napocska = new Egitest("Nap", 100, new Vektor(0, 0), new Vektor(1, 1), "#FF0000", "#000000", galaxis);
let foldecske = new Egitest("Föld", 10, new Vektor(-10, 30), new Vektor(-1, 1), "#0000FF", "#000000", galaxis);
let holdacska = new Egitest("Hold", 5, new Vektor(-15, 50), new Vektor(1, -1), "#999999", "#000000", galaxis);


function inicializalas(){
    
    vaszon.appendChild(napocska.svgobject);
    vaszon.appendChild(foldecske.svgobject);
    vaszon.appendChild(holdacska.svgobject);

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

function start(){
    inicializalas();
    animationStart()
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
    let s = galaxis.sulypont();
    console.log(s);
    galaxis.eltolas(Vektor.ellentett(s));

}






vaszon.addEventListener("mousedown", bolygo_letevese, false);

let globalis_kattintasszamlalo_valtozo = 0;

//  első kattintás p-t állít
// második kattintás v-t állít
// külön gomb pakolja le a bolygót, ha ez jó.

function bolygo_letevese(evt) {
    let cursorpt = cursorPoint(evt);
    let p = new Vektor(cursorpt.x, cursorpt.y);
    px.value = p.x;
    py.value = p.y;
    let v = new Vektor(parseFloat(vx.value), parseFloat(vy.value));
    let bolygocska = new Egitest(bolygonev.value, parseFloat(tomeg.value), p, v, egitest_belszin.value, egitest_kulszin.value, galaxis);
    vaszon.appendChild(bolygocska.svgobject);
}
    
function cursorPoint(evt) {
    let pt = vaszon.createSVGPoint();
    pt.x = evt.clientX; 
    pt.y = evt.clientY;    
    return pt.matrixTransform(vaszon.getScreenCTM().inverse());
}