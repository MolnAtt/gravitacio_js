let globalID;
let running = false;


// SZIMULÁCIÓHOZ HASZNÁLT VÁLTOZÓK DEKLARÁCIÓJA
let u;
let p;
let df;
let dr;

function update() {
    
    // SZIMULÁCIÓS LÉPÉS

    
    p.f+=df;
    p.r+=dr;

    u = Vektor.osszead(p.cartesian(), new Vektor(350,150));

    karika.cx.baseVal.value=u.x;
    karika.cy.baseVal.value=u.y;

    // SZIMULÁCIÓS LÉPÉS VÉGE

    globalID = requestAnimationFrame(update);
}

startbtn.addEventListener("click", start);
stopbtn.addEventListener("click", animationStop);

function start(){
    
    // SZIMULÁCIÓHOZ HASZNÁLT VÁLTOZÓK INICIALIZÁLÁSA
    p = new PolarVektor(0,0);
    df = parseFloat(vx.value);
    dr = parseFloat(vy.value);
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



