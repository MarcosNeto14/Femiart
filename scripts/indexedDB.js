// indexedDB.js

// Função para abrir ou criar o banco de dados
function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("FemiartDB", 1);

    request.onerror = (event) => {
      console.error("Erro ao abrir o banco de dados:", event);
      reject(event);
    };

    request.onsuccess = (event) => {
      console.log("Banco de dados aberto com sucesso");
      resolve(event.target.result);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      if (!db.objectStoreNames.contains("users")) {
        const userStore = db.createObjectStore("users", { keyPath: "id" });
        userStore.createIndex("email", "email", { unique: true });
        console.log('Object store "users" criado com sucesso');
      }

      if (!db.objectStoreNames.contains("carts")) {
        const cartStore = db.createObjectStore("carts", { keyPath: "userId" });
        console.log('Object store "carts" criado com sucesso');
      }

      if (!db.objectStoreNames.contains("orders")) {
        const orderStore = db.createObjectStore("orders", {
          keyPath: "orderId",
          autoIncrement: true,
        });
        console.log('Object store "orders" criado com sucesso');
      }
    };
  });
}

// Função para registrar uma nova compra
async function addUser(db, user) {
  return new Promise(async (resolve, reject) => {
    const transaction = db.transaction(["users"], "readwrite");
    const userStore = transaction.objectStore("users");

    // Gera o hash da senha antes de salvar o usuário
    user.password = await hashPassword(user.password);

    const request = userStore.add(user);

    request.onsuccess = () => {
      console.log("Usuário adicionado com sucesso");
      resolve();
    };

    request.onerror = (event) => {
      console.error("Erro ao adicionar o usuário:", event);
      reject(event);
    };
  });
}

function getOrders(userId) {
  return new Promise((resolve, reject) => {
    openDatabase().then((db) => {
      const transaction = db.transaction(["orders"], "readonly");
      const orderStore = transaction.objectStore("orders");
      const request = orderStore.index("userId").getAll(userId);

      request.onsuccess = (event) => {
        resolve(event.target.result);
      };

      request.onerror = (event) => {
        console.error("Erro ao obter compras:", event);
        reject(event);
      };
    });
  });
}

// Função para adicionar um usuário
function addUser(db, user) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(["users"], "readwrite");
    const userStore = transaction.objectStore("users");
    const request = userStore.add(user);

    request.onsuccess = () => {
      console.log("Usuário adicionado com sucesso");
      resolve();
    };

    request.onerror = (event) => {
      console.error("Erro ao adicionar o usuário:", event);
      reject(event);
    };
  });
}

// Função para verificar se o usuário existe e as credenciais estão corretas
function authenticateUser(db, email, plainPassword) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(["users"], "readonly");
    const userStore = transaction.objectStore("users");
    const index = userStore.index("email");
    const request = index.get(email);

    request.onsuccess = async (event) => {
      const user = event.target.result;

      if (user) {
        // Comparar a senha fornecida com o hash armazenado
        const hashedPassword = await hashPassword(plainPassword);
        if (user.password === hashedPassword) {
          console.log("Usuário autenticado com sucesso");

          // Salvar dados no sessionStorage e localStorage
          sessionStorage.setItem("loggedInUserEmail", email);
          localStorage.setItem("nomeUsuario", user.name);
          localStorage.setItem("loggedInUserEmail", email);
          localStorage.setItem("loggedInUserPhone", user.phone);
          window.location.href = "menu-produto.html"; // Redireciona após o login

          resolve(true);
        } else {
          console.error("Senha incorreta");
          resolve(false);
        }
      } else {
        console.error("Usuário não encontrado");
        resolve(false);
      }
    };

    request.onerror = (event) => {
      console.error("Erro ao autenticar o usuário:", event);
      reject(event);
    };
  });
}

// Função para buscar e exibir o nome do usuário
function displayUserName() {
  const nomeUsuario = localStorage.getItem("nomeUsuario");
  if (nomeUsuario) {
    const firstName = nomeUsuario.split(" ")[0]; // Obtém o primeiro nome
    document.querySelectorAll(".user-name").forEach((element) => {
      element.textContent = firstName;
    });
  }
}

document.addEventListener("DOMContentLoaded", displayUserName); // Busca o nome do usuário

// Função para adicionar um item ao carrinho
function addToCart(userId, item) {
  return new Promise((resolve, reject) => {
    openDatabase().then((db) => {
      const transaction = db.transaction(["carts"], "readwrite");
      const cartStore = transaction.objectStore("carts");
      cartStore.get(userId).onsuccess = (event) => {
        let cart = event.target.result || { userId: userId, items: [] };
        const existingItemIndex = cart.items.findIndex((i) => i.id === item.id);

        if (existingItemIndex > -1) {
          cart.items[existingItemIndex].quantity += item.quantity;
        } else {
          cart.items.push(item);
        }

        const request = cartStore.put(cart);

        request.onsuccess = () => {
          console.log("Item adicionado ao carrinho com sucesso");
          resolve();
        };

        request.onerror = (event) => {
          console.error("Erro ao adicionar item ao carrinho:", event);
          reject(event);
        };
      };
    });
  });
}

// Função para obter o carrinho de um usuário
function getCart(userId) {
  return new Promise((resolve, reject) => {
    openDatabase().then((db) => {
      const transaction = db.transaction(["carts"], "readonly");
      const cartStore = transaction.objectStore("carts");
      const request = cartStore.get(userId);

      request.onsuccess = (event) => {
        const cart = event.target.result || { userId: userId, items: [] };
        resolve(cart.items);
      };

      request.onerror = (event) => {
        console.error("Erro ao obter carrinho:", event);
        reject(event);
      };
    });
  });
}

function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
