function criarLayout(){

    const token = localStorage.getItem("TOKEN");
    const perfil = localStorage.getItem("PERFIL");
    const nome = localStorage.getItem("NOME");

    if(!token){
        window.location.href = "index.html";
        return;
    }

    document.body.innerHTML = `
    <div class="app">

        <div class="sidebar" id="sidebar">
            <h2>📘 WebQuiz</h2>

            <a href="painel.html">Painel</a>
            <a href="professor.html">Gerar Quiz</a>
            <a href="turmas.html">Turmas</a>
            ${perfil === "ADMIN" ? `<a href="admin.html">Admin</a>` : ``}
        </div>

        <!-- OVERLAY FORA DA SIDEBAR -->
        <div class="overlay" id="overlay" onclick="toggleMenu()"></div>

        <div class="main">

            <div class="topbar">
                <div class="menu-toggle" onclick="toggleMenu()">☰</div>
                <div class="user-info">
                    ${nome} (${perfil})
                    <button class="btn-logout" onclick="logout()">Sair</button>
                </div>
            </div>

            <div class="page-content" id="conteudo"></div>

        </div>
    </div>
    `;

}

function toggleMenu(){
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("overlay");

    sidebar.classList.toggle("open");
    overlay.classList.toggle("open");
}

function logout(){
    localStorage.clear();
    window.location.href = "index.html";
}
