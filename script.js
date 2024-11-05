// const card = document.getElementById('contactInformation');
const card = document.getElementById('contactCard');
const circles = [];
const numberOfCircles = 15; // Número de círculos
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





function downloadPDF() {
    const card = document.getElementById("contactCard");

    // Acessando jsPDF do módulo corretamente
    const { jsPDF } = window.jspdf;

    // Usando html2canvas para capturar apenas o cartão sem fundo
    html2canvas(card, { 
        backgroundColor: null, // Remove o fundo branco
        scale: 2 // Aumenta a resolução da captura
    }).then(canvas => {
        const imgData = canvas.toDataURL("image/png");
        // Criar um elemento de link
        const link = document.createElement("a");
        link.href = imgData;
        link.download = "cartao_de_contato.png";

        // Dispara o download
        link.click();

        // Remove o link temporário
        link.remove();

        // Definindo o tamanho do PDF em formato retrato (A4)
        const pdfWidth = 595.28; // A4 width in pixels
        const pdfHeight = 841.89; // A4 height in pixels
        
        // Ajustar a imagem para caber na página A4
        // const pdfHeight = (canvas.height * pdfWidth) / canvas.width; // Mantém a proporção
        
        // Criando um novo documento PDF em formato retrato
        const pdf = new jsPDF({
            // orientation: 'portrait', // Orientação retrato
            unit: 'px', // Usar pontos como unidade
            format: [pdfWidth, pdfHeight]
            // format: [pdfHeight, pdfWidth/2]
        });
        const imgHeight = (canvas.height * pdfWidth) / canvas.width; // Mantém a proporção

        // Ajustar a imagem para caber na página A4
        // const imgHeight = pdfHeight

        // Adiciona a imagem ao PDF
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, imgHeight);
        
        // Salva o PDF
        pdf.save("cartao_de_contato.pdf");

        // Adiciona a animação ao botão
        downloadBtn.classList.add('animate');

        // Remove a animação após um curto período
        setTimeout(() => {
            downloadBtn.classList.remove('animate');
        }, 1000); // Duração da animação
    });
}




// Iniciar a criação dos círculos
createCircles();
