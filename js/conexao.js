const API =
"https://script.google.com/macros/s/AKfycbw1gFy6amV1qPhyEcPMLSLpyfINLbooD81NyIiCcP2D1uXDpf4tqeCpn1DpNOoQqPmNPw/exec";


// ===============================
function normalizarChave(s){
  return String(s || "")
    .normalize("NFD")                 // remove acentos
    .replace(/[\u0300-\u036f]/g, "")
    .trim()                           // remove espaços nas pontas
    .toUpperCase();                   // padroniza
}

function tabelaParaObjetos(linhas){
  const cab = linhas[0].map(normalizarChave);

  return linhas.slice(1).map(l => {
    let obj = {};
    cab.forEach((c,i)=>{
      obj[c] = l[i];
    });
    return obj;
  });
}

// ===============================
// ===============================
async function carregarBancoCompleto(){

    const token = localStorage.getItem("TOKEN");

    // Se não tiver token, força login
    if(!token){
        window.location.href = "index.html";
        return;
    }

    try {

        const [respQuestoes, respDescritores] = await Promise.all([
            fetch(API + "?tipo=questoes&token=" + token),
            fetch(API + "?tipo=descritores&token=" + token)
        ]);

        const q = await respQuestoes.json();
        const d = await respDescritores.json();

        // Se backend negar acesso
        if(q.erro || d.erro){

            localStorage.removeItem("TOKEN");
            window.location.href = "index.html";
            return;
        }

        return {
            questoes: tabelaParaObjetos(q),
            descritores: tabelaParaObjetos(d)
        };

    } catch (e) {

        console.error("Erro ao carregar banco:", e);

        alert("Erro de conexão com o servidor.");
        return {
            questoes: [],
            descritores: []
        };
    }
}

async function fetchProtegido(url, options = {}){

    const resp = await fetch(url, options);
    const dados = await resp.json();

    if(dados.erro === "nao_autorizado"){

        localStorage.removeItem("TOKEN");

        window.location.href = "index.html";
        return null;
    }

    return dados;
}

// ===============================
// PROTEÇÃO AUTOMÁTICA AO CARREGAR PÁGINA
// ===============================

(function(){

    const paginasPublicas = [
        "index.html",
        "aluno.html",
        "quiz.html"
        "cadastro.html"
    ];

    const paginaAtual =
        window.location.pathname.split("/").pop();

    if(paginasPublicas.includes(paginaAtual)){
        return;
    }

    const token = localStorage.getItem("TOKEN");

    if(!token){
        window.location.href = "index.html";
    }

})();

// ===============================
// LOGOUT POR INATIVIDADE
// ===============================

(function(){

    const TEMPO_LIMITE = 30 * 60 * 1000; // 30 minutos

    const paginasPublicas = [
        "index.html",
        "aluno.html",
        "quiz.html"
        "cadastro.html"
    ];

    const paginaAtual =
        window.location.pathname.split("/").pop();

    if(paginasPublicas.includes(paginaAtual)){
        return; // não aplica para páginas públicas
    }

    let timer;

    function resetarTimer(){
        clearTimeout(timer);
        timer = setTimeout(encerrarSessao, TEMPO_LIMITE);
    }

    function encerrarSessao(){
        localStorage.removeItem("TOKEN");
        window.location.href = "index.html";
    }

    // Eventos que contam como atividade
    ["click","mousemove","keydown","scroll","touchstart"]
        .forEach(evento=>{
            document.addEventListener(evento, resetarTimer, true);
        });

    // Inicia contagem
    resetarTimer();

})();
