const API =
"https://script.google.com/macros/s/AKfycbwoeCI-gCMXauWzpTQUekSsotpPFXnhknsEUjyM8T3T_RxUv2c_v_0Ud8ACCCOazUgqfw/exec";

// converte matriz do Sheets em objetos
function matrizParaObjetos(matriz){
    const cab = matriz.shift();
    return matriz.map(l=>{
        let obj = {};
        cab.forEach((c,i)=>obj[c]=l[i]);
        return obj;
    });
}

// carrega questões + descritores via API segura
async function carregarBancoCompleto(){

    const q = await fetch(API + "?tipo=questoes");
    const questoes = matrizParaObjetos(await q.json());

    const d = await fetch(API + "?tipo=descritores");
    const descritores = matrizParaObjetos(await d.json());

    return {questoes, descritores};
}
