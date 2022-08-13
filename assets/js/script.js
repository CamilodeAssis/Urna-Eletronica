let c = (el) => document.querySelector(el);
let cs = (el) => document.querySelectorAll(el);

let seuVotoPara = c('.d1-1 span');
let cargo = c('.d1-2 span');
let descricao = c('.d1-4');
let aviso = c('.d-2');
let lateral = c('.d1-right');
let numeros = c('.d1-3');

let etapaAtual = 0;
let numero = '';
let branco = false;
let votos = [];

let endSound = new Audio();
endSound.src = 'assets/sons/confirma-urna.mp3'; 

function comecarEtapa() {
    let etapa = etapas[etapaAtual];

    let numeroHTML = "";
    numero = '';
    branco = false;

    for (let i = 0; i < etapa.numeros; i++) {
        if (i === 0) {
            numeroHTML += '<div class="numero foco"></div>';
        } else {
            numeroHTML += '<div class="numero"></div>';
        }

    }

    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = "";
    aviso.style.display = 'none';
    lateral.innerHTML = "";
    numeros.innerHTML = numeroHTML;
}

function atualizaInterface() {
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item) => {
        if (item.numero === numero) {
            return true;
        } else
            return false;
    });

    if (candidato.length > 0) {
        candidato = candidato[0]
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = `Nome: ${candidato.nome}<br/>Partido: ${candidato.partido}`;

        let fotosHtml = '';
        for (let i in candidato.fotos) {
            fotosHtml += `<div class="d1-img"><img src="/assets/images/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div>`;
        }
        lateral.innerHTML = fotosHtml;
    } else {
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = '<div class="avisoNuloBranco foco">VOTO NULO!<div/>'
    }
}



let botao = cs('[data-number]');

botao.forEach(b => {
    b.addEventListener('click', () => {
        const n = b.dataset.number
        let numeroEl = c('.numero.foco');
        if (numeroEl !== null) {
            numeroEl.innerHTML = n;
            numero = `${numero}${n}`;

            numeroEl.classList.remove('foco');
            if (numeroEl.nextElementSibling !== null) {
                numeroEl.nextElementSibling.classList.add('foco');
            } else {
                atualizaInterface();
            }
        }
    });

});

let botaoBranco = c('.branco').addEventListener('click', () => {
    if (numero === '') {
        branco = true;
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        numeros.innerHTML = '';
        descricao.innerHTML = '<div class="avisoNuloBranco foco">VOTO EM BRANCO!<div/>'
    } else {
        alert('PARA VOTAR EM BRANCO NÃO PODE TER DIGITADO NENHUM NUMERO. APERTE CORRIGE PARA REINICIAR. ')
    }
});
let botaoCorrige = c('.corrige').addEventListener('click', () => {
    comecarEtapa();
});
let botaoConfirma = c('.confirma').addEventListener('click', () => {
   
    let etapa = etapas[etapaAtual];
    let votoConfirmado = false;


    if (branco === true) {
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'branco'
        });


    } else if (numero.length === etapa.numeros) {
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numero
        });


    }
    if (votoConfirmado) {
        endSound.play();
        etapaAtual++;
        if (etapas[etapaAtual] !== undefined) {
            comecarEtapa();
        } else {
            c('.tela').innerHTML = '<div class="fim foco">FIM<div/>'
            console.log(votos);
        }
    }


});

comecarEtapa();

