//1° uso do Javascript (mudar os botões de criar conta para fazer login e vice-versa) 
const wrapper = document.getElementById('formWrapper');
const toggleBtn = document.getElementById('toggleBtn');
const toggleHeading = document.getElementById('toggleHeading');
const toggleText = document.getElementById('toggleText');
const loginForm = document.querySelector('.login');
const signinForm = document.querySelector('.signin');
// Uso de IA
toggleBtn.addEventListener('click', () => {
    wrapper.classList.toggle('active');
    loginForm.classList.toggle('active');
    signinForm.classList.toggle('active');

    if (wrapper.classList.contains('active')) {
        toggleHeading.textContent = "Já possui uma conta?";
        toggleText.textContent = "Faça login na sua conta";
        toggleBtn.textContent = "Login";
        // Fim do uso de IA
    } else {
        toggleHeading.textContent = "Não possui uma conta?";
        toggleText.textContent = "Crie uma conta!";
        toggleBtn.textContent = "Criar conta";
    }
});


//2° uso do Javascript (mudar o tema de cor da pagina de login)
const themeToggle = document.getElementById('themeToggle');

function toggleTheme() {
    document.body.classList.toggle('dark-theme');

    if (document.body.classList.contains('dark-theme')) {
        themeToggle.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
    } else {
        themeToggle.textContent = '🌙';
        localStorage.setItem('theme', 'light');
    }
}
// Uso de IA
function checkSavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggle.textContent = '☀️';
    }
}
// Fim do uso de IA

themeToggle.addEventListener('click', toggleTheme);

document.addEventListener('DOMContentLoaded', checkSavedTheme);

// Mudar de Pagina
document.getElementById("btnLogin").addEventListener("click", function (event) {
    event.preventDefault(); 
    window.location.href = "index.html";
});

document.getElementById("btnCriarConta").addEventListener("click", function (event) {
    event.preventDefault();
    window.location.href = "index.html";
});