const API =
"https://script.google.com/macros/s/AKfycbwoeCI-gCMXauWzpTQUekSsotpPFXnhknsEUjyM8T3T_RxUv2c_v_0Ud8ACCCOazUgqfw/exec";


// ===============================
// Converte matriz do Sheets → objetos
// ===============================
function tabelaParaObjetos(linhas){

    const cabecalho = linhas[0];

    return linhas.slice(1).map(linha => {

        let obj = {};

        cabecalho.forEach((col, i)=>{
            obj[col] = linha[i];
        });

        return obj;
    });
}


// ===============================
// Busca questões
// ===============================
async function carregarQuestoes(){

    const r = await fetch(API + "?tipo=questoes");
    const dados = await r.json();

    return tabelaParaObjetos(dados);
}


// ===============================
// Busca descritores
// ===============================
async function carregarDescritores(){

    const r = await fetch(API + "?tipo=descritores");
    const dados = await r.json();

    return tabelaParaObjetos(dados);
}


// ===============================
async function carregarBancoCompleto(){

    const [questoes, descritores] = await Promise.all([
        carregarQuestoes(),
        carregarDescritores()
    ]);

    return {questoes, descritores};
}
