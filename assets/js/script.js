let c = (el) => document.querySelector(el);
let cs = (el) => document.querySelectorAll(el);

let seuVotoPara = c('.d1-1 span');
let cargo = c('.d1-2 span');
let descriçao = c('.d1-4');
let aviso = c('.d-2');
let lateral = c('.d1-right');
let numeros = c('.d1-3');

let etapaAtual = 0;


function começarEtapa() {
    let etapa =etapas[etapaAtual];

    let numeroHTML = "";

    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descriçao.innerHTML = "";
    aviso.style.display = 'none';
    lateral.innerHTML = "";
    numeros.innerHTML = numeroHTML;
}




let botao = cs('[data-number]');

botao.forEach(b => {
    b.addEventListener('click', () => {
        const number = b.dataset.number
        alert(`Você clicou ${number}`);
    })
});

let branco = c('.branco').addEventListener('click', () => {
    alert(`Você clicou BRANCO`);
});
let corrige = c('.corrige').addEventListener('click', () => {
    alert(`Você clicou CORRIGE`);
});
let confirma = c('.confirma').addEventListener('click', () => {
    alert(`Você clicou CONFIRMA`);
});

começarEtapa();