function downloadPDF() {
    const card = document.getElementById("contactCard");

    html2canvas(card).then(canvas => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'px',
            format: [canvas.width, canvas.height]
        });

        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
        pdf.save("cartao_de_contato.pdf");
    });
}
