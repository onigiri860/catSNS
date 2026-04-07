// ====== game.js ======
const timeline = document.getElementById('timeline');
const loadingOverlay = document.getElementById('loading-overlay');
const bottomLoading = document.getElementById('bottom-loading');
const uiLevel = document.getElementById('ui-level');
const batteryBar = document.getElementById('battery-bar');
const trapBtn = document.getElementById('trap-btn');
const modeSelect = document.getElementById('mode-select');

const gameOverModal = document.getElementById('game-over-modal');
const gameOverText = document.getElementById('game-over-text');

let currentLevel = 1;
let battery = 100;
let isPlaying = false;
let isLoadingMore = false;
let batteryTimer;
let isTargetGenerated = false;
let loadCount = 0;
let currentTargetData = null;

let penaltyCount = 0; 

const postCallbacks = {
  onTarget: () => {
    if(!isPlaying) return;
    
    const flash = document.createElement('div');
    flash.className = 'level-up-flash';
    document.body.appendChild(flash);
    
    setTimeout(() => {
      flash.remove();
      currentLevel++;
      startLevel();
    }, 500); 
  },
  onPenalty: (msg, damage) => {
    if(!isPlaying) return;
    penaltyCount++;
    reduceBattery(damage);

    // ★修正：エラーの原因だった 'game-container' を 'app' に戻しました！
    const container = document.getElementById('app');
    container.classList.add('glitch');
    setTimeout(() => {
      container.classList.remove('glitch');
    }, 300); 
  }
};

function reduceBattery(amount) {
  battery -= amount;
  
  // ★修正：ここも 'app' に戻しました！
  const container = document.getElementById('app');
  
  if (battery <= 0) {
    battery = 0;
    isPlaying = false;
    clearInterval(batteryTimer);
    modeSelect.disabled = false;
    container.classList.remove('low-battery-alert');
    showGameOverModal();
  }
  
  batteryBar.style.width = battery + "%";
  if (battery > 50) batteryBar.style.background = "#28a745";
  else if (battery > 20) batteryBar.style.background = "#ffc107";
  else batteryBar.style.background = "#dc3545";

  if (battery <= 20 && battery > 0) {
    container.classList.add('low-battery-alert');
  } else {
    container.classList.remove('low-battery-alert');
  }
}

function showGameOverModal() {
  const modeName = modeSelect.options[modeSelect.selectedIndex].text;
  const shareString = `📱 SNS Lost Post\n🔋 バッテリー切れ...\n💀 記録：Lv.${currentLevel}（${modeName}）\n👁️ 偽物に${penaltyCount}回騙された。\n#SNSLostPost #謎言語SNS`;
  gameOverText.innerText = shareString;
  gameOverModal.style.display = 'flex';
}

window.copyShareText = function() {
  const textToCopy = gameOverText.innerText;
  navigator.clipboard.writeText(textToCopy).then(() => {
    alert("クリップボードにコピーしました！\nX(旧Twitter)などのSNSに貼り付けてシェアしてください。");
  }).catch(err => {
    alert("コピーに失敗しました。テキストを選択して手動でコピーしてください。");
  });
};

window.closeGameOverAndRetry = function() {
  gameOverModal.style.display = 'none';
  currentLevel = 1;
  penaltyCount = 0; 
  startLevel();
};

function startLevel() {
  isPlaying = false;
  clearInterval(batteryTimer);
  battery = 100;
  
  if(currentLevel === 1) penaltyCount = 0;

  reduceBattery(0);
  uiLevel.innerText = currentLevel;
  timeline.innerHTML = '';
  trapBtn.style.display = 'none';
  modeSelect.disabled = true;
  isTargetGenerated = false;
  loadCount = 0;
  currentTargetData = DATA_POOL.targets[Math.floor(Math.random() * DATA_POOL.targets.length)];

  window.scrollTo(0, 0);
  let peekTime = Math.max(200, 800 - (currentLevel * 100)); 
  
  timeline.appendChild(createPost('TARGET', true, postCallbacks, currentTargetData));
  for(let i=0; i<3; i++) timeline.appendChild(createPost('NORMAL', false, postCallbacks, currentTargetData));

  setTimeout(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    loadingOverlay.style.display = 'flex';
    setTimeout(() => {
      loadingOverlay.style.display = 'none';
      timeline.innerHTML = '';
      isPlaying = true; 
      loadMorePosts(); 
      batteryTimer = setInterval(() => reduceBattery(1), 1000); 
    }, 1500);
  }, peekTime);
}

function loadMorePosts() {
  if (!isPlaying) return;
  isLoadingMore = true;
  bottomLoading.style.display = 'block';

  setTimeout(() => {
    bottomLoading.style.display = 'none';
    if (!isPlaying) return; 

    const amount = 20;
    loadCount++; 
    let targetIndex = -1;

    if (!isTargetGenerated) {
      let probability = (loadCount === 1) ? 0.2 : (loadCount === 2) ? 0.5 : 1.0;
      if (Math.random() < probability) {
        targetIndex = Math.floor(Math.random() * amount);
        isTargetGenerated = true;
      }
    }

    for (let i = 0; i < amount; i++) {
      if (i === targetIndex) {
        timeline.appendChild(createPost('TARGET', false, postCallbacks, currentTargetData));
      } else {
        const rand = Math.random();
        const trapRate = Math.min(0.2, currentLevel * 0.05); 
        
        if (rand < trapRate) timeline.appendChild(createPost('FAKE', false, postCallbacks, currentTargetData));
        else if (rand < 0.2) timeline.appendChild(createPost('AD', false, postCallbacks, currentTargetData));
        else timeline.appendChild(createPost('NORMAL', false, postCallbacks, currentTargetData));
      }
    }
    isLoadingMore = false;
  }, 1000); 
}

window.addEventListener('scroll', () => {
  if (!isPlaying) return;
  if (!isLoadingMore && (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
    loadMorePosts();
  }
  if (Math.random() < 0.02 && window.scrollY > 500) {
    trapBtn.style.display = 'block';
  } else if (Math.random() < 0.1) {
    trapBtn.style.display = 'none';
  }
});

trapBtn.onclick = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  trapBtn.style.display = 'none';
  postCallbacks.onPenalty("", 10);
};

document.getElementById('header').onclick = () => {
  currentLevel = 1;
  startLevel();
};