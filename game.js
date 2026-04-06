// ====== game.js ======
const timeline = document.getElementById('timeline');
const loadingOverlay = document.getElementById('loading-overlay');
const bottomLoading = document.getElementById('bottom-loading');
const uiLevel = document.getElementById('ui-level');
const batteryBar = document.getElementById('battery-bar');
const trapBtn = document.getElementById('trap-btn');
const modeSelect = document.getElementById('mode-select'); // ★追加

let currentLevel = 1;
let battery = 100;
let isPlaying = false;
let isLoadingMore = false;
let batteryTimer;
let isTargetGenerated = false;
let loadCount = 0;
let currentTargetData = null;

const postCallbacks = {
  onTarget: () => {
    alert(`レベル ${currentLevel} クリア！\n次のレベルに進みます。`);
    currentLevel++;
    startLevel();
  },
  onPenalty: (msg, damage) => {
    if(!isPlaying) return;
    alert(msg + `\nバッテリー -${damage}%`);
    reduceBattery(damage);
  }
};

function reduceBattery(amount) {
  battery -= amount;
  if (battery <= 0) {
    battery = 0;
    isPlaying = false;
    clearInterval(batteryTimer);
    modeSelect.disabled = false; // ★ゲームオーバーでモード切替ロック解除
    alert("スマホのバッテリーが切れました...ゲームオーバー！\nレベル1からやり直します。");
    currentLevel = 1;
  }
  
  batteryBar.style.width = battery + "%";
  if (battery > 50) batteryBar.style.background = "#28a745";
  else if (battery > 20) batteryBar.style.background = "#ffc107";
  else batteryBar.style.background = "#dc3545";
}

function startLevel() {
  isPlaying = false;
  clearInterval(batteryTimer);
  battery = 100;
  reduceBattery(0);
  uiLevel.innerText = currentLevel;
  timeline.innerHTML = '';
  trapBtn.style.display = 'none';
  
  modeSelect.disabled = true; // ★ゲーム開始時にモード切替をロック（ズル防止）

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
  postCallbacks.onPenalty("ああっ！誤タップで一番上に戻ってしまった！", 10);
};

document.getElementById('header').onclick = startLevel;