const API =
"https://script.googleusercontent.com/macros/echo?user_content_key=AY5xjrRQeEZrvqSD4IL3aieQzrBUW4EA1CywIZ_1pwioPKyBwWlAbtwjlLpx2hJpdpmz4TNKi4CycVgwjQpWg8EPAGWi5bPlpuwUoObslQDUrxyjqg74irzTtc_IxA48l0vGslSNkFIzw7Rd6MgihQMjbKlw6fsjK0u2hH3oPT0O2KJeXJxEQE3AgwIq7U942QyJy0v0FCvk8uq993c1KX7KB_yetRAYaxQRz9whtScrcv3XmPrT73yBLjBMUyAp8RFUlXJdQA7RKTyuE8EyFPGUZChAT0bJqGpFjTARvXXi&lib=MN_fobGt8mer4vD3E2MqWznplwbpoqQh3";


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
