// crypto.js

// Função para criar um hash SHA-256 da senha
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// Função para validar o email
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Função para validar o telefone (aceita apenas números)
function validatePhone(phone) {
  const re = /^\d{10,15}$/;
  return re.test(phone);
}
