// Estado de la aplicación
let currentStage = 0;
let noAttempts = 0;
let yesButtonScale = 1;
let noButtonScale = 1;

// Elementos del DOM
const stages = ['stage1', 'stage2', 'stage3', 'stage4'];

// Función para cambiar entre etapas
function showStage(stageNumber) {
    stages.forEach((stageId, index) => {
        const stage = document.getElementById(stageId);
        if (stage) {
            stage.style.display = index === stageNumber ? 'flex' : 'none';
        }
    });
    currentStage = stageNumber;
}

// Función para manejar el botón "Sí"
function handleYesClick() {
    // Mostrar la pantalla final de éxito
    showStage(3);
    
    // Crear corazones flotantes
    createFloatingHearts();
    
    // Reproducir confetti (opcional)
    celebrateSuccess();
}

// Función para manejar el botón "No"
function handleNoClick() {
    noAttempts++;
    
    // Hacer el botón "No" más pequeño
    noButtonScale = Math.max(0.3, noButtonScale - 0.15);
    
    // Hacer el botón "Sí" más grande
    yesButtonScale = Math.min(2, yesButtonScale + 0.2);
    
    // Actualizar escalas de botones
    updateButtonScales();
    
    // Mover el botón "No" a posición aleatoria
    moveNoButton();
    
    // Cambiar de etapa después de ciertos intentos
    if (noAttempts === 2 && currentStage === 0) {
        setTimeout(() => showStage(1), 500);
    } else if (noAttempts === 4 && currentStage === 1) {
        setTimeout(() => showStage(2), 500);
    }
}

// Función para actualizar las escalas de los botones
function updateButtonScales() {
    const yesButtons = document.querySelectorAll('.yes-button');
    const noButtons = document.querySelectorAll('.no-button');
    
    yesButtons.forEach(btn => {
        btn.style.transform = `scale(${yesButtonScale})`;
    });
    
    noButtons.forEach(btn => {
        btn.style.transform = `scale(${noButtonScale})`;
    });
}

// Función para mover el botón "No" aleatoriamente
function moveNoButton() {
    const noButtons = document.querySelectorAll('.no-button');
    
    noButtons.forEach(btn => {
        const randomX = (Math.random() - 0.5) * 200; // -100 a 100 px
        const randomY = (Math.random() - 0.5) * 200;
        
        btn.style.transition = 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        btn.style.transform = `translate(${randomX}px, ${randomY}px) scale(${noButtonScale})`;
    });
}

// Función para crear corazones flotantes
function createFloatingHearts() {
    const body = document.body;
    const heartsContainer = document.createElement('div');
    heartsContainer.className = 'floating-hearts-container';
    heartsContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9999;
        overflow: hidden;
    `;
    
    // Crear 30 corazones
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = '❤️';
            heart.style.cssText = `
                position: absolute;
                bottom: -50px;
                left: ${Math.random() * 100}%;
                font-size: ${20 + Math.random() * 40}px;
                animation: floatUp ${3 + Math.random() * 3}s ease-in forwards;
                opacity: 0;
            `;
            heartsContainer.appendChild(heart);
            
            // Eliminar el corazón después de la animación
            setTimeout(() => heart.remove(), 6000);
        }, i * 100);
    }
    
    body.appendChild(heartsContainer);
    
    // Limpiar contenedor después
    setTimeout(() => heartsContainer.remove(), 10000);
}

// Función de celebración
function celebrateSuccess() {
    // Agregar clase de animación al cuerpo
    document.body.classList.add('celebrating');
    
    // Vibración en móviles (si está disponible)
    if (navigator.vibrate) {
        navigator.vibrate([200, 100, 200]);
    }
}

// Función para compartir
function handleShare() {
    if (navigator.share) {
        navigator.share({
            title: '¡Danna dijo que sí! 💕',
            text: '¡Vamos a celebrar San Valentín juntos!',
            url: window.location.href
        }).catch(err => console.log('Error al compartir:', err));
    } else {
        // Fallback: copiar al portapapeles
        const text = '¡Danna dijo que sí! 💕 Vamos a celebrar San Valentín juntos!';
        navigator.clipboard.writeText(text).then(() => {
            alert('¡Texto copiado al portapapeles!');
        });
    }
}

// Función para reiniciar la invitación
function resetInvitation() {
    currentStage = 0;
    noAttempts = 0;
    yesButtonScale = 1;
    noButtonScale = 1;
    showStage(0);
    updateButtonScales();
}

// Agregar animación CSS para corazones flotantes
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        0% {
            opacity: 0;
            transform: translateY(0) rotate(0deg);
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            opacity: 0;
            transform: translateY(-100vh) rotate(360deg);
        }
    }
    
    .celebrating {
        animation: backgroundPulse 2s ease-in-out;
    }
    
    @keyframes backgroundPulse {
        0%, 100% {
            filter: brightness(1);
        }
        50% {
            filter: brightness(1.2);
        }
    }
    
    .no-button {
        transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        cursor: pointer;
        position: relative;
    }
    
    .yes-button {
        transition: all 0.3s ease;
        cursor: pointer;
    }
    
    .yes-button:hover {
        transform: scale(1.1) !important;
    }
    
    .no-button:hover {
        animation: shake 0.5s;
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
    
    /* Efecto de brillo en botón Sí */
    .yes-button::before {
        content: '';
        position: absolute;
        top: -2px;
        left: -2px;
        right: -2px;
        bottom: -2px;
        background: linear-gradient(45deg, #10b981, #059669, #10b981);
        border-radius: inherit;
        z-index: -1;
        opacity: 0;
        transition: opacity 0.3s;
        animation: glowPulse 2s infinite;
    }
    
    .yes-button:hover::before {
        opacity: 1;
    }
    
    @keyframes glowPulse {
        0%, 100% {
            opacity: 0.5;
        }
        50% {
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Inicializar la aplicación al cargar
document.addEventListener('DOMContentLoaded', function() {
    // Mostrar la primera etapa
    showStage(0);
    
    // Agregar event listeners a todos los botones "Sí"
    document.querySelectorAll('.yes-button').forEach(btn => {
        btn.addEventListener('click', handleYesClick);
    });
    
    // Agregar event listeners a todos los botones "No"
    document.querySelectorAll('.no-button').forEach(btn => {
        btn.addEventListener('click', handleNoClick);
        
        // También mover en hover para móviles
        btn.addEventListener('mouseenter', () => {
            if (noAttempts > 0) {
                moveNoButton();
            }
        });
        
        // Para touch en móviles
        btn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            handleNoClick();
        });
    });
    
    // Agregar event listener al botón de compartir
    const shareButtons = document.querySelectorAll('.share-button');
    shareButtons.forEach(btn => {
        btn.addEventListener('click', handleShare);
    });
    
    // Agregar event listener al botón de reiniciar (si existe)
    const resetButtons = document.querySelectorAll('.reset-button');
    resetButtons.forEach(btn => {
        btn.addEventListener('click', resetInvitation);
    });
});

// Prevenir clic derecho en botón "No"
document.addEventListener('contextmenu', function(e) {
    if (e.target.classList.contains('no-button')) {
        e.preventDefault();
        handleNoClick();
    }
});

// Easter egg: doble clic en el título
document.addEventListener('DOMContentLoaded', function() {
    const titles = document.querySelectorAll('h1');
    titles.forEach(title => {
        title.addEventListener('dblclick', function() {
            createFloatingHearts();
        });
    });
});

// Efecto de partículas al mover el mouse
let mouseX = 0;
let mouseY = 0;
let particles = [];

document.addEventListener('mousemove', function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Crear partícula ocasionalmente
    if (Math.random() > 0.95 && currentStage < 3) {
        createParticle(mouseX, mouseY);
    }
});

function createParticle(x, y) {
    const particle = document.createElement('div');
    particle.innerHTML = '✨';
    particle.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
        z-index: 1000;
        font-size: 12px;
        animation: fadeOut 1s forwards;
    `;
    
    document.body.appendChild(particle);
    
    setTimeout(() => particle.remove(), 1000);
}

// Animación de fadeOut para partículas
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes fadeOut {
        0% {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(-50px) scale(0);
        }
    }
`;
document.head.appendChild(particleStyle);

console.log('💕 Invitación de San Valentín cargada correctamente');
