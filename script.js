
// SZIMULÁCIÓHOZ HASZNÁLT VÁLTOZÓK DEKLARÁCIÓJA

let napocska = new Egitest("Nap", 100, new Vektor(0, 0), new Vektor(1, 1), "#FF0000", "#000000");
let foldecske = new Egitest("Föld", 10, new Vektor(-10, 30), new Vektor(-1, 1), "#0000FF", "#000000");


function inicializalas(){

    vaszon.appendChild(napocska.svgobject);
    vaszon.appendChild(foldecske.svgobject);

}

function szimulacios_lepes(){

    napocska.mozogj();
    foldecske.mozogj();

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
