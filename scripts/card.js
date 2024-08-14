// Aceitar apenas números no campo de número do cartão e CVV
document.getElementById('card-number-input').addEventListener('input', function () {
    this.value = this.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
    const cardNumber = this.value.replace(/(.{4})/g, '$1 ').trim();
    document.querySelector('.card-number').textContent = cardNumber || '#### #### #### ####';
  });
  
  document.getElementById('cvv-input').addEventListener('input', function () {
    this.value = this.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
  });
  
  // Aceitar apenas caracteres no campo de nome do cartão
  document.getElementById('card-name-input').addEventListener('input', function () {
    this.value = this.value.replace(/[^A-Za-z\s]/g, ''); // Remove todos os caracteres não alfabéticos
    const cardName = this.value.toUpperCase();
    document.querySelector('.card-name').textContent = cardName || 'NOME NO CARTÃO';
  });
  