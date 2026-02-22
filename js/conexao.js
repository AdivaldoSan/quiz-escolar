const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vT1lJ0sUJwMigB4zCrEgu8v_QpfzhX7ctHy5iNK6EtKyjJgWroTZYBkbExjsAbN5XYFHSbXhJI5eMzm/pub?output=csv";

// Função para ler a planilha
async function carregarQuestoes() {
    const resposta = await fetch(SHEET_URL);
    const texto = await resposta.text();

    const linhas = texto.split("\n").map(l => l.split(","));

    const cabecalho = linhas.shift();

    const dados = linhas.map(linha => {
        let obj = {};
        cabecalho.forEach((col, i) => obj[col.trim()] = linha[i]);
        return obj;
    });

    return dados;
}
