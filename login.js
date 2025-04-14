const logins = {
    "user1@email.com": {
      password: "F4G7H2J9",
      redirect: "https://site1.com"
    },
    "admin@miner.com": {
      password: "B3K1D8P0",
      redirect: "https://site2.com"
    },
    "teste@btc.com": {
      password: "W9X2V5L1",
      redirect: "https://site3.com"
    }
  };
  
  function login() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const error = document.getElementById("error");
  
    if (logins[email] && logins[email].password === password) {
      window.location.href = logins[email].redirect;
    } else {
      error.textContent = "E-mail ou senha incorretos.";
    }
  }
  
