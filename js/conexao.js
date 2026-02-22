const API = "https://script.google.com/macros/s/AKfycbwoeCI-gCMXauWzpTQUekSsotpPFXnhknsEUjyM8T3T_RxUv2c_v_0Ud8ACCCOazUgqfw/exec";


// =============================
// CARREGA QUESTÕES + DESCRITORES
// =============================
async function carregarBancoCompleto(){

    const questoesResp = await fetch(API + "?tipo=questoes");
    const questoesMat = await questoesResp.json();

    const descrResp = await fetch(API + "?tipo=descritores");
    const descrMat = await descrResp.json();

    return {
        questoes: matrizParaObjetos(questoesMat),
        descritores: matrizParaObjetos(descrMat)
    };
}


// =============================
// CONVERTE MATRIZ → OBJETOS JS
// =============================
function matrizParaObjetos(matriz){

    if(!Array.isArray(matriz) || matriz.length === 0){
        return [];
    }

    // primeira linha = cabeçalho
    const cabecalho = matriz[0].map(h => String(h).trim());

    const linhas = matriz.slice(1);

    return linhas.map(linha => {

        let obj = {};

        cabecalho.forEach((col, i) => {
            obj[col] = (linha[i] !== undefined && linha[i] !== null)
                ? String(linha[i]).trim()
                : "";
        });

        return obj;
    });
}
