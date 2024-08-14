document.getElementById("continue-btn").addEventListener("click", function () {
  const selectedPaymentMethod = document.querySelector(
    'input[name="metodo"]:checked'
  ).value;

  if (selectedPaymentMethod) {
    document.body.classList.add("fade-out");
    setTimeout(() => {
      if (selectedPaymentMethod === "credito") {
        window.location.href = "confirmacao-credito.html";
      } else if (selectedPaymentMethod === "pix") {
        window.location.href = "pix-qrcode.html";
      } else if (selectedPaymentMethod === "boleto") {
        window.location.href = "confirmacao-boleto.html";
      }
    }, 1000); // Espera 1 segundo para a animação de saída
  }
});

document.getElementById('add-card-btn').addEventListener('click', function () {
  window.location.href = 'adicionar_cartao.html';
});
