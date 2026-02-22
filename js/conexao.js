const BASE =
"https://docs.google.com/spreadsheets/d/e/2PACX-1vT1lJ0sUJwMigB4zCrEgu8v_QpfzhX7ctHy5iNK6EtKyjJgWroTZYBkbExjsAbN5XYFHSbXhJI5eMzm";

// função que usa a API gviz (não sofre bloqueio CORS)
async function carregarAba(gid){

    const url = `${BASE}/gviz/tq?tqx=out:json&gid=${gid}`;

    const resp = await fetch(url);
    const txt = await resp.text();

    // limpa o wrapper estranho que o Google manda
    const json = JSON.parse(txt.substring(47).slice(0, -2));

    const cols = json.table.cols.map(c => c.label);

    const dados = json.table.rows.map(r => {
        let obj = {};
        r.c.forEach((cel,i)=>{
            obj[cols[i]] = cel ? cel.v : "";
        });
        return obj;
    });

    return dados;
}

// carrega tudo
async function carregarBancoCompleto(){

    const questoes = await carregarAba("0");            // QUESTOES
    const descritores = await carregarAba("499737335"); // DESCRITORES

    return {questoes, descritores};
}
