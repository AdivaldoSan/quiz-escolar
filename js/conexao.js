const BASE =
"https://docs.google.com/spreadsheets/d/e/2PACX-1vT1lJ0sUJwMigB4zCrEgu8v_QpfzhX7ctHy5iNK6EtKyjJgWroTZYBkbExjsAbN5XYFHSbXhJI5eMzm/pub?output=csv";

// função que lê uma aba específica
async function carregarAba(gid) {
    const url = BASE + "&gid=" + gid;
    const resp = await fetch(url);
    const txt = await resp.text();

    const linhas = txt.split("\n").map(l => l.split(","));
    const cab = linhas.shift();

    return linhas
        .filter(l => l.length > 1 && l[0] !== "")
        .map(l => {
            let obj = {};
            cab.forEach((c,i)=>obj[c.trim()] = l[i]);
            return obj;
        });
}

// carrega o banco completo (QUESTOES + DESCRITORES)
async function carregarBancoCompleto(){

    const questoes = await carregarAba("0");          // QUESTOES
    const descritores = await carregarAba("499737335"); // DESCRITORES

    return {questoes, descritores};
}
