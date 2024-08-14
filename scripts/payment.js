window.onload = function () {
    // Recuperando as informações do localStorage
    const cardNumber = localStorage.getItem('cardNumber');
    const cardName = localStorage.getItem('cardName');
    const expiryDate = localStorage.getItem('expiryDate');
  
    // Exibindo as informações na tela
    document.getElementById('card-number').textContent = cardNumber;
    document.getElementById('card-name').textContent = cardName;
    document.getElementById('expiry-date').textContent = expiryDate;
  };
  