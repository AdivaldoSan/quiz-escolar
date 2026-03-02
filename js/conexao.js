const API =
"https://script.google.com/macros/s/AKfycbzo9s5qFkyukuFgaAkEyJwTvwk9OdxbPp_hgVkALnc1rZCWeqDt8KLBVCcwRYKxfkS8uQ/exec";


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
            alert("Sessão expirada ou não autorizada. Faça login novamente.");
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
