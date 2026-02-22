const BASE =
"https://docs.google.com/spreadsheets/d/e/2PACX-1vT1lJ0sUJwMigB4zCrEgu8v_QpfzhX7ctHy5iNK6EtKyjJgWroTZYBkbExjsAbN5XYFHSbXhJI5eMzm/pub?output=csv";

async function carregarAba(gid) {
    const url = BASE + "&gid=" + gid;
    const resp = await fetch(url);
    const txt = await resp.text();

    const linhas = txt.split("\n").map(l => l.split(","));
    const cab = linhas.shift();

    return linhas.map(l => {
        let obj = {};
        cab.forEach((c,i)=>obj[c.trim()] = l[i]);
        return obj;
    });
}

// IDs das abas (vamos descobrir uma vez só)
async function carregarBancoCompleto(){

    const questoes = await carregarAba("0");  // aba QUESTOES
    const descritores = await carregarAba("1"); // aba DESCRITORES

    return {questoes, descritores};
}
