const API =
"https://script.google.com/macros/s/AKfycby-6d_XGnm5_HVSdNailYo6hKLM4Mxu3SVGpnK3j8rNTWcO61BYQcDZmraaVHnkFbvNNg/exec";


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

    const token = localStorage.getItem("TOKEN");

    if(!token){
        window.location.href = "index.html";
        return;
    }

    const [q,d] = await Promise.all([
        fetch(API+"?tipo=questoes&token="+token).then(r=>r.json()),
        fetch(API+"?tipo=descritores&token="+token).then(r=>r.json())
    ]);

    if(q.erro || d.erro){
        alert("Sessão expirada. Faça login novamente.");
        localStorage.removeItem("TOKEN");
        window.location.href = "index.html";
        return;
    }

    return {
        questoes: tabelaParaObjetos(q),
        descritores: tabelaParaObjetos(d)
    };
}
