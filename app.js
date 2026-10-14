const btnTheme = document.getElementById('btnTheme');

const getPreferredTheme = () => {
    try {
        const savedTheme = localStorage.getItem('theme');

        if (savedTheme === 'dark' || savedTheme === 'light') {
            return savedTheme;
        }
    } catch {
        // localStorage puede no estar disponible.
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
};

const setTheme = (theme) => {
    document.body.classList.toggle('dark-mode', theme === 'dark');

    if (btnTheme) {
        btnTheme.textContent = theme === 'dark' ? 'Modo Claro' : 'Modo Oscuro';
    }

    try {
        localStorage.setItem('theme', theme);
    } catch {
        
    }
};

let userSelectedTheme = false;
setTheme(getPreferredTheme());

btnTheme?.addEventListener('click', () => {
    const currentTheme = document.body.classList.contains('dark-mode')
        ? 'dark'
        : 'light';

    userSelectedTheme = true;
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
});

const colorScheme = window.matchMedia('(prefers-color-scheme: dark)');

colorScheme.addEventListener('change', (event) => {
    if (!userSelectedTheme) {
        setTheme(event.matches ? 'dark' : 'light');
    }
});

document.querySelectorAll('.btn-like').forEach((button) => {
    const likeCountElement = button.querySelector('.like-count');

    if (!likeCountElement) return;

    button.addEventListener('click', () => {
        const currentCount = parseInt(likeCountElement.textContent, 10) || 0;
        const newCount = currentCount === 0 ? 1 : 0;

        likeCountElement.textContent = newCount;
        button.classList.toggle('liked', newCount > 0);

        if (newCount > 0 && typeof canvasConfetti === 'function') {
            const rect = button.getBoundingClientRect();

            canvasConfetti({
                particleCount: 30,
                spread: 45,
                origin: {
                    x: (rect.left + rect.width / 2) / window.innerWidth,
                    y: (rect.top + rect.height / 2) / window.innerHeight
                }
            }); 
        }
    });
});

const formFeedback = document.getElementById('formFeedback');

formFeedback?.addEventListener('submit', async (event) => {
    event.preventDefault();

const autor = document.getElementById('autor').value.trim();
const proyecto = document.getElementById('proyecto').value;
const comentario = document.getElementById('comentario').value.trim();

if (autor.length < 3 || proyecto === '' || comentario.length < 5) {
    Swal.fire({
        title: 'Datos incompletos',
        text: 'Completa todos los campos correctamente.',
        icon: 'error',
        confirmButtonColor: '#38bdf8'
    });
    return;
}

const nuevoComentario = document.createElement('div');

nuevoComentario.textContent = autor + ' - ' + proyecto + ': ' + comentario;
nuevoComentario.classList.add('comment-card');

const contenedor = document.getElementById('comentariosContainer');
contenedor.appendChild(nuevoComentario);

document.getElementById('sinComentarios').style.display = 'none';

Swal.fire({
    title: '¡Proyecto Enviado!',
    text: 'Tu valoracion fue publicada.',
    icon: 'success',
    confirmButtonColor: '#38bdf8'
});

confetti({
    particleCount: 120,
    spread: 80,
    origin: { y: 0.6 },
});

formFeedback.reset();
});
