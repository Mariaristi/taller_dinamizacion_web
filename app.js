const likeButtons = document.querySelectorAll('.btn-like');

if (likeButtons.length > 0) {
    likeButtons.forEach(button => {
        const likeCountElement = button.querySelector('.like-count');
        
        // Función para actualizar el contador visualmente
        const updateLikeCount = (count) => {
            likeCountElement.textContent = count;
            // Resaltar el botón cuando recibe un like
            button.classList.add('liked');
            setTimeout(() => button.classList.remove('liked'), 300);
        };

        // Función para manejar el clic en like
        const handleLikeClick = () => {
            let currentCount = parseInt(likeCountElement.textContent) || 0;
            
            // Alternar estado de like (activar/desactivar)
            if (currentCount === 0) {
                currentCount++;
                button.classList.add('liked');
            } else {
                currentCount--;
                button.classList.remove('liked');
            }
            
            updateLikeCount(currentCount);
            
            // Emitir efecto de confeti al dar like (si la librería está cargada)
            if (typeof canvasConfetti !== 'undefined') {
                setTimeout(() => canvasConfetti({
                    particleCount: 30,
                    spread: 45,
                    origin: { 
                        x: button.getBoundingClientRect().left + button.offsetWidth / 2 - window.innerWidth / 2,
                        y: button.getBoundingClientRect().top + button.offsetHeight / 2 - window.innerHeight / 2
                    }
                }), 100);
            }
        };

        // Agregar evento de clic al botón like
        button.addEventListener('click', handleLikeClick);
    });
}

// Función de cambio de tema (Modo Claro / Modo Oscuro)
const btnTheme = document.getElementById('btnTheme');

if (btnTheme) {
    // Estilos CSS para el modo oscuro (inludidos en styles.css o inline)
    
    // Alternar clase dark-mode en el body y actualizar texto del botón
    btnTheme.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');
        
        // Actualizar texto del botón dinámicamente
        btnTheme.textContent = isDarkMode ? 'Modo Claro' : 'Modo Oscuro';
    });

    // Verificar si ya está en modo oscuro al cargar la página
    if (document.body.classList.contains('dark-mode')) {
        btnTheme.textContent = 'Modo Claro';
    }
}
