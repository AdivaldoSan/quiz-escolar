const PLANILHA_ID = "1WEwIs2YnMYGv1OsvvhmOxlDFCG_kNL6O4kgo4BwzmWU";

// Lê uma aba pelo gid usando API oficial de visualização
async function carregarAba(gid){

    const url = `https://docs.google.com/spreadsheets/d/${PLANILHA_ID}/gviz/tq?tqx=out:json&gid=${gid}`;

    const resp = await fetch(url);
    const txt = await resp.text();

    // remove o wrapper do Google
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

// carrega banco completo
async function carregarBancoCompleto(){

    const questoes = await carregarAba("0");            // QUESTOES
    const descritores = await carregarAba("499737335"); // DESCRITORES

    return {questoes, descritores};
}
