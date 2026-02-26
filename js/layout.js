// js/layout.js

function criarLayout(){

    const token = localStorage.getItem("TOKEN");
    const perfil = localStorage.getItem("PERFIL");
    const nome = localStorage.getItem("NOME");

    if(!token){
        window.location.href = "index.html";
        return;
    }

    const nav = document.createElement("div");
    nav.style.padding = "12px";
    nav.style.marginBottom = "20px";
    nav.style.background = "#f2f2f2";
    nav.style.display = "flex";
    nav.style.justifyContent = "space-between";
    nav.style.alignItems = "center";

    let menu = `
        <div>
            <b>📘 Sistema Web Quiz</b> |
            <a href="painel.html">Painel</a> |
            <a href="professor.html">Gerar Quiz</a> |
            <a href="turmas.html">Turmas</a>
    `;

    if(perfil === "ADMIN"){
        menu += ` | <a href="admin.html">Admin</a>`;
    }

    menu += `
        </div>
        <div>
            ${nome} (${perfil})
            <button onclick="logout()">Sair</button>
        </div>
    `;

    nav.innerHTML = menu;

    document.body.insertBefore(nav, document.body.firstChild);
}

function logout(){
    localStorage.clear();
    window.location.href = "index.html";
}
