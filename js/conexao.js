const API =
"https://script.google.com/macros/s/AKfycbzVkBqTlzyRMIEq2f1ZP6qOeJ9y5lNfmI83qLpCIsCxnhyTf_TXTb4_TDguW-j5x5XwkA/exec";


// ===============================
function tabelaParaObjetos(linhas){

    const cab = linhas[0];

    return linhas.slice(1).map(l => {

        let obj = {};

        cab.forEach((c,i)=>{
            obj[c] = l[i];
        });

        return obj;
    });
}


// ===============================
async function carregarBancoCompleto(){

    const [q,d] = await Promise.all([
        fetch(API+"?tipo=questoes").then(r=>r.json()),
        fetch(API+"?tipo=descritores").then(r=>r.json())
    ]);

    return {
        questoes: tabelaParaObjetos(q),
        descritores: tabelaParaObjetos(d)
    };
}
