karika.setAttribute('fill', 'red');
startgomb.addEventListener('click', start);

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

async function start(){
    let x = parseFloat(vx.value);
    let y = parseFloat(vy.value);

    for (let i = 0; i < 100; i++) {
        karika.cx.baseVal.value+=x;
        karika.cy.baseVal.value+=y;
        await sleep(100);
    }
}


