const startBtn = document.getElementById("startBtn");
const progressBar = document.getElementById("progressBar");
const walletDisplay = document.getElementById("wallet");
const blocksDisplay = document.getElementById("blocks");
const logBox = document.getElementById("logBox");
const withdrawalToast = document.getElementById("withdrawalToast");
const hashrateDisplay = document.getElementById("hashrate");
const temperatureDisplay = document.getElementById("temperature");
const powerDisplay = document.getElementById("power");
const warningToast = document.getElementById("warningToast");

let mining = false;
let miningFinished = false;
let wallet = 0;
let blocks = 0;
let progress = 0;
let interval;
let statsInterval;
let lastOverheatWarning = 0;

// CONFIGURAÇÃO MANUAL:
const miningDuration = 600; // segundos até concluir a mineração
const rewardBTC = 0.00004020; // recompensa total a ser minerada

startBtn.addEventListener("click", () => {
  if (mining || miningFinished) return; // impede novas minerações
  startMining();
});

function startMining() {
  mining = true;
  startBtn.textContent = "Parar Mineração";
  logBox.textContent += "⛏ Iniciando mineração...\n";

  const steps = miningDuration;
  const btcPerStep = rewardBTC / steps;
  const intervalTime = 1000; // 1 segundo

  interval = setInterval(() => {
    if (progress >= 100) {
      stopMining(true);
      return;
    }

    progress += 100 / steps;
    progressBar.style.width = `${progress}%`;

    wallet += btcPerStep;
    blocks += 1;

    walletDisplay.textContent = wallet.toFixed(8) + " BTC";
    blocksDisplay.textContent = blocks;

    const success = Math.random() > 0.08;
    const mined = btcPerStep.toFixed(8);
    const log = success
      ? `✔ Bloco ${blocks} minerado com sucesso: +${mined} BTC`
      : `✖ Falha ao validar o bloco ${blocks}, tentando novamente...`;
    logBox.textContent += log + "\n";
    logBox.scrollTop = logBox.scrollHeight;
  }, intervalTime);

  statsInterval = setInterval(updateStats, 2000);
}

function stopMining(showToast = false) {
  clearInterval(interval);
  clearInterval(statsInterval);
  mining = false;
  miningFinished = true;

  startBtn.textContent = "Mineração Concluída";
  startBtn.classList.add("bg-gray-600", "cursor-not-allowed");
  startBtn.disabled = true;

  if (showToast) {
    setTimeout(() => {
      withdrawalToast.classList.remove("hidden");
    }, 500);

    setTimeout(() => {
      withdrawalToast.classList.add("hidden");
    }, 7000);
  }
}

function updateStats() {
  const hashrate = (Math.random() * 20 + 50).toFixed(2); // 50 ~ 70 H/s
  const temperature = (60 + Math.random() * 10).toFixed(1); // 60 ~ 70 °C
  const power = (110 + Math.random() * 10).toFixed(0); // 110 ~ 120 W

  hashrateDisplay.textContent = `${hashrate} H/s`;
  temperatureDisplay.textContent = `${temperature} °C`;
  powerDisplay.textContent = `${power} W`;

  const now = Date.now();
  const isOverheating = parseFloat(temperature) > 75;
  const warningCooldown = 15000;

  if (isOverheating && now - lastOverheatWarning > warningCooldown) {
    lastOverheatWarning = now;
    warningToast.classList.remove("hidden");

    setTimeout(() => {
      warningToast.classList.add("hidden");
    }, 4000);
  }
}

// ------- NAVEGAÇÃO SPA ADICIONADA AQUI -------
function navigateTo(section) {
  document.querySelectorAll("main, section").forEach(el => {
    el.style.display = "none";
  });

  const target = document.getElementById(section);
  if (target) target.style.display = "block";
}

// -------- INICIALIZAÇÃO SPA --------
document.addEventListener("DOMContentLoaded", () => {
  navigateTo('home');
});

function showToast(tipo) {
    const toast = document.getElementById("customToast");
    const title = document.getElementById("toastTitle");
    const message = document.getElementById("toastMessage");
  
    if (tipo === "recarga") {
      title.textContent = "Recarga Indisponível";
      message.textContent = "Nosso sistema de recarga automática está temporariamente fora do ar.";
    } else if (tipo === "saque") {
      title.textContent = "Saque Indisponível";
      message.textContent = "Para prosseguir com sua solicitação de retirada, entre em contato com nossa equipe diretamente pelo WhatsApp.";
    }
  
    toast.classList.remove("hidden");
  
    setTimeout(() => {
      toast.classList.add("hidden");
    }, 6000);
  }
  
  function openHowItWorks() {
    document.getElementById("howItWorksModal").classList.remove("hidden");
  }
  
  function closeHowItWorks() {
    document.getElementById("howItWorksModal").classList.add("hidden");
  }
  
  function showUnavailable(type) {
    const label = type === "recarga" 
      ? "Nosso sistema de recarga automática está indisponível no momento." 
      : "Para prosseguir com sua solicitação de retirada, entre em contato com nossa equipe diretamente pelo WhatsApp.";
  
    const toast = document.createElement("div");
    toast.className = "fixed inset-0 z-50 flex items-end justify-center pb-24 pointer-events-none";
    toast.innerHTML = `
      <div class="bg-gray-900 border border-yellow-500 text-yellow-300 px-5 py-4 rounded-2xl shadow-2xl animate-fade-in-down max-w-sm w-[90%] pointer-events-auto">
        <div class="flex items-start gap-4">
          <i class="ri-error-warning-line text-yellow-400 text-3xl animate-pulse"></i>
          <div>
            <p class="font-semibold text-base">Indisponível</p>
            <p class="text-sm text-yellow-400 opacity-80">${label}</p>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 6000);
  }
  
    // Lógica de Mineração Concluída
    if (progressBarWidth === 100) {
      document.getElementById('withdrawalToast').classList.remove('hidden');
    }
  
    const notificationBtn = document.getElementById("notificationBtn");
const notificationPanel = document.getElementById("notificationPanel");
const notificationBadge = document.getElementById("notificationBadge");

let notificationVisible = false;

notificationBtn.addEventListener("click", () => {
  notificationVisible = !notificationVisible;

  if (notificationVisible) {
    notificationPanel.classList.remove("hidden");
    notificationBadge.style.display = "none";
  } else {
    notificationPanel.classList.add("hidden");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const notificationBtn = document.getElementById("notificationBtn");
  const notificationPanel = document.getElementById("notificationPanel");

  notificationBtn.addEventListener("click", () => {
    if (notificationPanel.classList.contains("hidden")) {
      notificationPanel.classList.remove("hidden");
    } else {
      notificationPanel.classList.add("hidden");
    }
  });
});
