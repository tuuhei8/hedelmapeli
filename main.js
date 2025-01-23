let pelaaNappi = document.getElementById('pelaaNappi');
pelaaNappi.addEventListener('click', pelaa);

let era = 0;
let panos = 0;
let potti = 10;
const tulokset = [{rulla:0}, {rulla:0}, {rulla:0}, {rulla:0}];
document.getElementById('potti').innerHTML = potti;

// Pyörittää rullia:
function pelaa() {
    if (panos === 0) {
        document.getElementById('ilmoitus').innerHTML = 'Aseta panos';
    } else {
        for (i = 0; i < 4; i++) {
            if (document.getElementById('check' + `${i}`).checked) {
                continue;
            }
            const luku = Math.floor(Math.random() * 5);
            tulokset[i].rulla = luku;
            document.getElementById('rulla' + `${i}`).setAttribute('src', 'img/hedelma' + `${luku}` + '.png');
        }
        tarkista();
        lukkojenTila();
        if (era === 0) {
            era++;
        } else {
            era = 0;
        }
    }
}

// Tarkistaa rullien tuloksen:
function tarkista() {
    const voittoYhdistelmat = [
        {yhdistelma:'0000', kerroin:3}, {yhdistelma:'1111', kerroin:4},
        {yhdistelma:'2222', kerroin:5}, {yhdistelma:'3333', kerroin:6},
        {yhdistelma:'4444', kerroin:10}
    ];
    let kolmeSeiskaa = 0;
    let voittoKerroin = 0;

    // Tulokset stringiksi jotta sitä voi verrata voittoYhdistelmiin:
    let string = '';
    for (i = 0; i < 4; i++) {
        string += tulokset[i].rulla.toString();
    }

    // Nelosten tarkistus:
    for (i = 0; i < 5; i++) {
        if (voittoYhdistelmat[i].yhdistelma === string) {
            voittoKerroin = voittoYhdistelmat[i].kerroin;
        }
    }
    
    // Kolmen seiskan tarkistus:
    for (i = 0; i < 4; i++) {
        if (tulokset[i].rulla === 4) {
            kolmeSeiskaa++;
        }
    }
    if (kolmeSeiskaa === 3) {
        voittoKerroin = 5;
    }

    // Voitot ja tappiot:
    if (voittoKerroin !== 0) {
        document.getElementById('ilmoitus').innerHTML = `Voitit ${panos*voittoKerroin}€. Aseta panos.`;
        era = 1;
        potti += panos * voittoKerroin;
    } else if (era === 1 && voittoKerroin === 0) {
        potti = potti - panos;
        if (potti === 0) {
            document.getElementById('ilmoitus').innerHTML = 'Raha loppui.';
        } else {
            document.getElementById('ilmoitus').innerHTML = 'Ei voittoa. Aseta panos.';
        }
    }
    if (era === 1) {
        panos = 0;
    }
    document.getElementById('panos').innerHTML = panos;
    document.getElementById('potti').innerHTML = potti - panos;
}

// Lukot päälle ja pois:
function lukkojenTila() {
    let lukot = document.querySelectorAll('.lukitus');
    if (era === 0) {
        for (i = 0; i < 4; i++) {
            lukot[i].setAttribute('onclick', `lukko(${i})`);
            document.getElementById('lukko' + `${i}`).setAttribute('src', 'img/lukitsematon.png');
            document.getElementById('check' + `${i}`).disabled = false;
            document.getElementById('ilmoitus').innerHTML = `Ei voittoa. Voit lukita haluamasi rullat.`;
        }
    } else {
        for (i = 0; i < 4; i++) {
            lukot[i].removeAttribute('onclick');
            document.getElementById('lukko' + `${i}`).setAttribute('src', 'img/disabled.png');
            document.getElementById('check' + `${i}`).checked = false;
            document.getElementById('check' + `${i}`).disabled = true;
        }
    }
}

// Lukitus toiminto:
function lukko(luku) {
    if (document.getElementById('check' + `${luku}`).checked == false) {
        document.getElementById('check' + `${luku}`).checked = true;
        document.getElementById('lukko' + `${luku}`).setAttribute('src', 'img/lukittu.png');
    } else {
        document.getElementById('check' + `${luku}`).checked = false;
        document.getElementById('lukko' + `${luku}`).setAttribute('src', 'img/lukitsematon.png');
    }
}

// Panoksen asetus
function panoksenAsetus(luku) {
    if (luku > potti) {
        document.getElementById('ilmoitus').innerHTML = 'Rahaa ei riitä valitsemaasi panokseen.'
    } else if (era === 1) {
        document.getElementById('ilmoitus').innerHTML = 'Panosta ei voi muuttaa kesken pelin.'
    } else {
         document.getElementById('ilmoitus').innerHTML = 'Paina PELAA.'
        panos = luku;
        document.getElementById('potti').innerHTML = potti - panos;
        document.getElementById('panos').innerHTML = panos;
    }
}