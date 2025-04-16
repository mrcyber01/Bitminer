const logins = {
  "oliveiralaira271@gmail.com": {
    password: "F4G7H2J9",
    redirect: "F4G7H2J9.html"
  },
  "admin@miner.com": {
    password: "B3K1D8P0",
    redirect: "diretorio/B3K1D8P0.html"
  },
  "teste@btc.com": {
    password: "W9X2V5L1",
    redirect: "diretorio/W9X2V5L1.html"
  }
};

function login() {
  const email = document.getElementById("email").value.trim().toLowerCase();
  const password = document.getElementById("password").value.trim();
  const error = document.getElementById("error");

  if (logins[email] && logins[email].password === password) {
    window.location.href = logins[email].redirect;
  } else {
    error.textContent = "E-mail ou senha incorretos.";
  }
}
