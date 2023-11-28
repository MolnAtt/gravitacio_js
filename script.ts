// SZIMULÁCIÓHOZ HASZNÁLT VÁLTOZÓK DEKLARÁCIÓJA
import { Egitest } from "./egitest";
import { Galaxis } from "./galaxis";
import { Vektor } from "./vektor";

let galaxis = new Galaxis("Kistejút");
let napocska = new Egitest("Nap", 100, new Vektor(0, 0), new Vektor(1, 1), "#FF0000", "#000000", galaxis);
let foldecske = new Egitest("Föld", 10, new Vektor(-10, 30), new Vektor(-1, 1), "#0000FF", "#000000", galaxis);
let holdacska = new Egitest("Hold", 5, new Vektor(-15, 50), new Vektor(1, -1), "#999999", "#000000", galaxis);

const vaszon = document.getElementById("vaszon") as unknown as SVGSVGElement;
const bolygonev = document.getElementById("bolygonev") as HTMLInputElement;
const vx = document.getElementById("vx") as HTMLInputElement;
const vy = document.getElementById("vy") as HTMLInputElement;
const px = document.getElementById("px") as HTMLInputElement;
const py = document.getElementById("py") as HTMLInputElement;

const tomeg = document.getElementById("tomeg") as HTMLInputElement;
const egitest_belszin = document.getElementById("egitest_belszin") as HTMLInputElement;
const egitest_kulszin = document.getElementById("egitest_kulszin") as HTMLInputElement;

const startbtn = document.getElementById("startbtn") as HTMLButtonElement;
const stopbtn = document.getElementById("stopbtn") as HTMLButtonElement;
const sulypontbtn = document.getElementById("sulypontbtn") as HTMLButtonElement;

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

// --------------------------------- Motorháztető alatt -----------------------------------------------

let globalID: number;
let running = false;

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

let globalis_kattintasszamlalo_valtozo = 0;

//  első kattintás p-t állít
// második kattintás v-t állít
// külön gomb pakolja le a bolygót, ha ez jó.

function bolygo_letevese(evt: MouseEvent) {
    const cursorpt = cursorPoint(evt);
    const p = new Vektor(cursorpt.x, cursorpt.y);
    px.value = p.x.toString();
    py.value = p.y.toString();
    const v = new Vektor(parseFloat(vx.value), parseFloat(vy.value));
    const bolygocska = new Egitest(bolygonev.value, parseFloat(tomeg.value), p, v, egitest_belszin.value, egitest_kulszin.value, galaxis);
    vaszon.appendChild(bolygocska.svgobject);
}

function cursorPoint(evt: MouseEvent) {
    const pt = vaszon.createSVGPoint();
    pt.x = evt.clientX;
    pt.y = evt.clientY;
    return pt.matrixTransform(vaszon.getScreenCTM()!!.inverse());
}
