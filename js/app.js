document.getElementById('loginForm').addEventListener('submit', async function(event) {
  event.preventDefault(); // Impede o envio padrão do formulário

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      alert('Login bem-sucedido!');
      // Salve o token no localStorage e redirecione
      localStorage.setItem('token', data.token);
      window.location.href = 'menu-produtos.html';
    } else {
      alert('Email ou senha incorretos. Tente novamente.');
    }
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    alert('Ocorreu um erro. Tente novamente mais tarde.');
  }
});
