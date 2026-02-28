function criarLayout(){

    const token = localStorage.getItem("TOKEN");
    const perfil = localStorage.getItem("PERFIL");
    const nome = localStorage.getItem("NOME");

    if(!token){
        window.location.href = "index.html";
        return;
    }

    // Detecta página atual
    const paginaAtual =
        window.location.pathname.split("/").pop();

    document.body.innerHTML = `
    <div class="app">

        <div class="sidebar" id="sidebar">

  <div class="logo-area">
    <h2 class="logo">
      Avalia<span class="logo-plus">+</span>
    </h2>
    <p class="logo-sub">
      Plataforma de Avaliação Digital
    </p>
  </div>

  <div class="menu-principal">
    <a href="painel.html"
       class="${paginaAtual==='painel.html'?'active':''}">
       Relatórios
    </a>

    <a href="professor.html"
       class="${paginaAtual==='professor.html'?'active':''}">
       Gerar Simulado
    </a>

    <a href="turmas.html"
       class="${paginaAtual==='turmas.html'?'active':''}">
       Turmas
    </a>

    ${perfil === "ADMIN" ? `
      <a href="admin.html"
         class="${paginaAtual==='admin.html'?'active':''}">
         Admin
      </a>
    ` : ``}
  </div>

  <div class="sidebar-bottom">
    <a href="sobre.html"
       class="${paginaAtual==='sobre.html'?'active':''}">
       Sobre
    </a>
  </div>

</div>

        <div class="overlay"
             id="overlay"
             onclick="toggleMenu()"></div>

        <div class="main">

            <div class="topbar">
                <div class="menu-toggle"
                     onclick="toggleMenu()">☰</div>

                <div class="user-info">
                    ${nome} (${perfil})
                    <button class="btn-logout"
                            onclick="logout()">Sair</button>
                </div>
            </div>

            <div class="page-content"
                 id="conteudo"></div>

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
