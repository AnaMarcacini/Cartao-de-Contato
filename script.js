// const card = document.getElementById('contactInformation');
const card = document.getElementById('contactCard');
const circles = [];
const numberOfCircles = 5; // Número de círculos
const speed = 0.5; // Velocidade de movimento
// Função para criar círculos
function createCircles() {
    for (let i = 0; i < numberOfCircles; i++) {
        const circle = document.createElement('div');
        circle.classList.add('circle');
        setRandomPosition(circle);
        setRandomDirection(circle);
        setRandomSizeAndOpacity(circle);
        circles.push(circle);
        card.appendChild(circle);
    }
    moveCircles();
}

// Função para definir uma posição aleatória
function setRandomPosition(circle) {
    circle.style.left = Math.random() * (card.clientWidth - 40) + 'px'; 
    circle.style.top = Math.random() * (card.clientHeight - 40) + 'px'; 
}

// Função para definir uma direção aleatória
function setRandomDirection(circle) {
    circle.directionX = Math.random() < 0.5 ? speed : -speed; // Direção horizontal
    circle.directionY = Math.random() < 0.5 ? speed : -speed; // Direção vertical
}

// Função para definir um tamanho e opacidade aleatórios
function setRandomSizeAndOpacity(circle) {
    const size = Math.random() * 30 + 10; // Tamanho aleatório entre 10px e 40px
    const opacity = Math.random() * 0.5 + 0.3; // Opacidade aleatória entre 0.3 e 0.8
    circle.style.width = size + 'px';
    circle.style.height = size + 'px';
    circle.style.opacity = opacity;
}

// Função para mover círculos
function moveCircles() {
    circles.forEach(circle => {
        let left = parseFloat(circle.style.left);
        let top = parseFloat(circle.style.top);

        // Atualiza a posição
        circle.style.left = (left + circle.directionX) + 'px';
        circle.style.top = (top + circle.directionY) + 'px';

        // Verifica colisão com as bordas
        if (left + circle.directionX <= 0 || left + circle.directionX >= card.clientWidth - 40) {
            circle.directionX *= -1; // Inverte a direção horizontal
            setRandomSizeAndOpacity(circle); // Altera tamanho e opacidade ao bater na borda
        }
        if (top + circle.directionY <= 0 || top + circle.directionY >= card.clientHeight - 40) {
            circle.directionY *= -1; // Inverte a direção vertical
            setRandomSizeAndOpacity(circle); // Altera tamanho e opacidade ao bater na borda
        }
    });

    requestAnimationFrame(moveCircles); // Chama a função novamente para continuar o movimento
}

// Iniciar a criação dos círculos
createCircles();
