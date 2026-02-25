const API =
"https://script.google.com/macros/s/AKfycbwgCZX0zeg-cAI8KgxeoF79P0SjIdMh3jNkIQ2aJ_xy9k76td740o7oDNgay9Th7M-kxA/exec";


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
