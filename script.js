let diamondBalance = parseFloat(localStorage.getItem('diamondBalance')) || 0;
let adViewCount = parseInt(localStorage.getItem('adViewCount')) || 0;

const balanceDisplay = document.getElementById('balance');
const viewAdBtn = document.getElementById('viewAd');
const redeemBtn = document.getElementById('redeem');
const msgDisplay = document.getElementById('msg');

// Adsterra links
const adLinks = [
  "https://www.profitableratecpm.com/xn53gy8hj7?key=c18df3151d31145f233c2799914a1966",
  "https://www.profitableratecpm.com/hey692dy?key=2f032ba6d97b6b6da930c342c439b857",
  "https://www.profitableratecpm.com/ht160txevh?key=a7fbb659cf34adfbc9088287ed0f562c",
  "https://www.profitableratecpm.com/wrfx97pnpa?key=39030c722be8328cbd2248f514cf8eae",
  "https://www.profitableratecpm.com/vt8u31bkv?key=fe78693180507727c9c56a7f1ec670f0"
];

// Diamond reward generator
function getRandomDiamonds() {
  const rand = Math.random() * 100;
  if (rand <= 0.75) return 5;
  if (rand <= 1.25) return 3;
  if (rand <= 21.25) return 1;
  if (rand <= 51.25) return 0.5;
  return 0.25;
}

function updateBalance() {
  balanceDisplay.innerText = diamondBalance.toFixed(2);
  localStorage.setItem('diamondBalance', diamondBalance);
  localStorage.setItem('adViewCount', adViewCount);
}

// Handle Ad View
viewAdBtn.addEventListener('click', () => {
  const adUrl = adLinks[Math.floor(Math.random() * adLinks.length)];
  window.open(adUrl, '_blank');

  setTimeout(() => {
    const reward = getRandomDiamonds();
    diamondBalance += reward;
    adViewCount++;

    updateBalance();
    msgDisplay.innerText = `🎉 Congratulations! You earned ${reward} diamonds!\nAd views: ${adViewCount}/50`;

    if (adViewCount >= 50) {
      msgDisplay.innerText += `\n🔥 You've completed 50 ad views!`;
      adViewCount = 0;
    }
  }, 5000); // simulate view wait
});

// Handle Redeem
redeemBtn.addEventListener('click', () => {
  const gameId = document.getElementById('gameId').value.trim();
  const amount = parseInt(document.getElementById('amount').value);

  if (!gameId) {
    msgDisplay.innerText = "❗ Please enter your Game ID.";
    return;
  }

  if (isNaN(amount) || amount < 50) {
    msgDisplay.innerText = "❗ Minimum redeem is 50 diamonds.";
    return;
  }

  if (diamondBalance < amount) {
    msgDisplay.innerText = "❗ Not enough diamonds.";
    return;
  }

  diamondBalance -= amount;
  updateBalance();

  msgDisplay.innerText = `✅ ${amount} diamonds sent to ID ${gameId}!\n💎 Remaining: ${diamondBalance.toFixed(2)}`;

  // Set form values and submit
  document.getElementById('sendGameId').value = gameId;
  document.getElementById('sendAmount').value = amount;
  document.getElementById('redeemForm').submit();
});

// On page load
updateBalance();
