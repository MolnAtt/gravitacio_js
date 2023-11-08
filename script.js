let globalID;
let running = false;


// SZIMULÁCIÓHOZ HASZNÁLT VÁLTOZÓK DEKLARÁCIÓJA
let x;
let y;

function update() {
    
    // SZIMULÁCIÓS LÉPÉS

    karika.cx.baseVal.value+=x;
    karika.cy.baseVal.value+=y;

    // SZIMULÁCIÓS LÉPÉS VÉGE

    globalID = requestAnimationFrame(update);
}

startbtn.addEventListener("click", start);
stopbtn.addEventListener("click", animationStop);

function start(){
    
    // SZIMULÁCIÓHOZ HASZNÁLT VÁLTOZÓK INICIALIZÁLÁSA
    x = parseFloat(vx.value);
    y = parseFloat(vy.value);
    // EDDIG


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



