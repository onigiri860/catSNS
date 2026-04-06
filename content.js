// ====== content.js ======

function getRandomItem(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

function generateFakeAIText() {
  const s = getRandomItem(DATA_POOL.subjects);
  const a = getRandomItem(DATA_POOL.actions);
  const h = getRandomItem(DATA_POOL.hashtags);
  return `${s}、${a} ${h}`;
}

// 1文字だけ絶妙に違うテキストを生成する関数
function generateSubtleFakeText(text) {
  const replacements = [
    { org: "！", fake: "!" },
    { org: "🐾", fake: "🐈" },
    { org: "...", fake: "‥" },
    { org: "❄️", fake: "⛄️" },
    { org: "かも", fake: "かな" },
    { org: "【拡散希望】", fake: "[拡散希望]" }
  ];
  let newText = text;
  const shuffled = [...replacements].sort(() => 0.5 - Math.random());
  for (let r of shuffled) {
    if (newText.includes(r.org)) {
      return newText.replace(r.org, r.fake);
    }
  }
  return newText + " "; 
}

// ★変更：モードに応じて日本語を謎言語に変換する関数
function translateToAlien(text, mode) {
  // 独自文字モード(alien)以外は、普通の日本語のまま返す
  if (mode !== 'alien') return text;

  let translated = text;

  // 単語をヒエログリフに置換
  for (const [ja, alien] of Object.entries(ALIEN_DICTIONARY.words)) {
    const regex = new RegExp(ja, "g");
    translated = translated.replace(regex, alien);
  }

  // 残りのひらがな等をすべて謎記号に置換（独自文字モードは最初から全開）
  let charTranslated = "";
  for (let i = 0; i < translated.length; i++) {
    const char = translated[i];
    charTranslated += ALIEN_DICTIONARY.chars[char] || char; 
  }

  return charTranslated;
}

function createPost(type, isPeek, callbacks, targetData) {
  const post = document.createElement('div');
  post.className = 'post';
  const randomId = Math.floor(Math.random() * 1000);
  
  // 現在のモードを取得
  const gameMode = document.getElementById('mode-select').value;
  const isDemo = gameMode === 'demo'; 

  const getTargetIcon = () => `url('https://picsum.photos/seed/${targetData.iconSeed}/100/100')`;
  const getNormalIcon = (id) => `url('https://picsum.photos/seed/user${id}/100/100')`;

  if (type === 'TARGET') {
    const fontWeight = isDemo ? "bold" : "normal";
    const displayText = translateToAlien(targetData.text, gameMode); // ★モードを渡す

    post.innerHTML = `
      <div class="post-icon" style="background-image: ${getTargetIcon()};"></div>
      <div class="post-content">
        <div class="post-header"><span class="user-name">${targetData.name}</span><span class="user-id">${targetData.handle}</span></div>
        <div class="post-text" style="font-weight: ${fontWeight};">${displayText}</div>
      </div>
    `;
    post.onclick = () => isPeek ? alert("更新されてしまった！") : callbacks.onTarget();

  } else if (type === 'FAKE') {
    let fakeName, fakeHandle, fakeText, fakeIcon;

    if (isDemo) {
      // デモモード：わかりやすい偽物
      fakeName = `${targetData.name}（模倣）`;
      fakeHandle = `${targetData.handle}_fake`;
      fakeText = "さっき言ったのは嘘です。本当は…";
      fakeIcon = `url('https://picsum.photos/seed/${targetData.iconSeed}_fake/100/100')`; 
    } else {
      // 本番＆独自文字モード：微妙な違いの極悪偽物
      fakeName = targetData.name;
      fakeHandle = targetData.handle + "_"; 
      fakeText = generateSubtleFakeText(targetData.text); 
      fakeIcon = getTargetIcon(); 
    }

    const displayText = translateToAlien(fakeText, gameMode); // ★モードを渡す

    post.innerHTML = `
      <div class="post-icon" style="background-image: ${fakeIcon};"></div>
      <div class="post-content">
        <div class="post-header"><span class="user-name">${fakeName}</span><span class="user-id">${fakeHandle}</span></div>
        <div class="post-text">${displayText}</div>
      </div>
    `;
    post.onclick = () => callbacks.onPenalty("騙されたな！よく見ろ、これは偽物アカウントだ！", 15);

  } else if (type === 'AD') {
    const displayText = translateToAlien("大人気御礼！今すぐチェック！", gameMode); // ★モードを渡す
    post.innerHTML = `
      <div class="post-icon" style="background-image: url('https://picsum.photos/seed/ad_icon${randomId}/100/100'); border: 2px solid #000;"></div>
      <div class="post-content">
        <span class="ad-label">プロモーション</span>
        <div class="post-header"><span class="user-name">スポンサー企業</span></div>
        <div class="post-text">${displayText}</div>
        <img src="https://picsum.photos/seed/ad${randomId}/400/250" class="post-image">
      </div>
    `;
    post.onclick = () => callbacks.onPenalty("広告をタップしてしまった！", 20);

  } else {
    const hasImage = Math.random() < 0.2; 
    const rawText = generateFakeAIText();
    const displayText = translateToAlien(rawText, gameMode); // ★モードを渡す

    post.innerHTML = `
      <div class="post-icon" style="background-image: ${getNormalIcon(randomId)};"></div>
      <div class="post-content">
        <div class="post-header"><span class="user-name">${getRandomItem(DATA_POOL.userNames)}</span><span class="user-id">${getRandomItem(DATA_POOL.userHandles)}</span></div>
        <div class="post-text">${displayText}</div>
        ${hasImage ? `<img src="https://picsum.photos/seed/img${randomId}/400/250" class="post-image">` : ''}
      </div>
    `;
    post.onclick = () => callbacks.onPenalty("これは普通の投稿だ。", 5);
  }
  return post;
}