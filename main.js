const timeline = document.getElementById('timeline');
const loadingOverlay = document.getElementById('loading-overlay');
const colors = ["#ff9999", "#99ccff", "#99ff99", "#ffcc99", "#cc99ff", "#ffff99", "#e0e0e0"];

const parts = {
  subjects: ["今日のランチ", "最近のAI", "このゲーム", "うちの猫", "新作の映画", "明日の天気", "仕事", "休日の過ごし方"],
  actions: ["マジでヤバい。", "最高すぎる！", "微妙かもしれない…", "謎すぎるww", "癒される〜", "楽しみすぎる！", "終わらない。", "どうしよう。"],
  hashtags: ["#日常", "#おすすめ", "#助けて", "#最高", "#知らんけど", "#ゲーム開発", "#猫のいる暮らし", "#草"]
};

function generateFakeAIText() {
  const subject = parts.subjects[Math.floor(Math.random() * parts.subjects.length)];
  const action = parts.actions[Math.floor(Math.random() * parts.actions.length)];
  const hashtag = parts.hashtags[Math.floor(Math.random() * parts.hashtags.length)];
  return `${subject}、${action} ${hashtag}`;
}

function getRandomItem(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

// ★ 引数に「type（投稿の種類）」を追加
// type: 'TARGET' (正解), 'FAKE' (偽物), 'AD' (広告), 'NORMAL' (通常)
function createPost(type, isPeek = false) {
  const post = document.createElement('div');
  post.className = 'post';
  const randomId = Math.floor(Math.random() * 1000);

  if (type === 'TARGET') {
    // 【本物】
    post.innerHTML = `
      <div class="post-icon" style="background-color: #ff0000;"></div>
      <div class="post-content">
        <div class="post-header"><span class="user-name">絶対に見つけたい投稿</span><span class="user-id">@target_post</span></div>
        <div class="post-text" style="font-weight: bold; color: red;">【ターゲット】さっき見えた幻の投稿はこれだ！！！ここをタップ！</div>
      </div>
    `;
    post.onclick = () => isPeek ? alert("あっ！タップする前に更新されてしまった！") : alert("クリア！よく見つけましたね！🎉");
  
  } else if (type === 'FAKE') {
    // 【偽物トラップ】アイコンも赤く、文字も似せている
    post.innerHTML = `
      <div class="post-icon" style="background-color: #ff3333;"></div>
      <div class="post-content">
        <div class="post-header"><span class="user-name">絶体に見つけたい投槁</span><span class="user-id">@target_posu</span></div>
        <div class="post-text" style="font-weight: bold; color: #cc0000;">【ターゲツト】さっき見えた幻の投槁はこれだ！？ここをタップ？</div>
      </div>
    `;
    post.onclick = () => alert("ひっかかったな！これはフェイク（偽物）だ！よく見ろ！");

  } else if (type === 'AD') {
    // 【広告トラップ】無駄にでかい画像で邪魔をする
    post.innerHTML = `
      <div class="post-icon" style="background-color: #000000;"></div>
      <div class="post-content">
        <span class="ad-label">プロモーション</span>
        <div class="post-header"><span class="user-name">謎のスマホゲーム公式</span><span class="user-id">@game_pr</span></div>
        <div class="post-text">全世界1億ダウンロード突破！？今すぐプレイしてSSRキャラをゲットしよう！</div>
        <img src="https://picsum.photos/seed/${randomId}/400/300" class="post-image" alt="広告画像">
      </div>
    `;
    post.onclick = () => alert("広告をタップしてしまった！ブラウザが開いてタイムロス！");

  } else {
    // 【通常】
    const color = getRandomItem(colors);
    const text = generateFakeAIText();
    const hasImage = Math.random() < 0.2; // 画像付きは20%に減らす（広告を目立たせるため）
    const imageHtml = hasImage ? `<img src="https://picsum.photos/seed/${randomId}/400/200" class="post-image" alt="ダミー画像">` : '';

    post.innerHTML = `
      <div class="post-icon" style="background-color: ${color};"></div>
      <div class="post-content">
        <div class="post-header"><span class="user-name">一般ユーザー</span><span class="user-id">@user_${randomId}</span></div>
        <div class="post-text">${text}</div>
        ${imageHtml}
      </div>
    `;
    post.onclick = () => alert("ハズレ！これは普通の投稿です。");
  }
  return post;
}

function setupGame() {
  timeline.innerHTML = ''; 
  window.scrollTo(0, 0);
  
  // チラ見せフェーズ
  timeline.appendChild(createPost('TARGET', true));
  for(let i=0; i<3; i++) timeline.appendChild(createPost('NORMAL'));

  setTimeout(() => {
    // ★変更：投稿は消さずに、一番上に戻ってオーバーレイ（ぐるぐる）を被せる
    window.scrollTo({ top: 0, behavior: 'smooth' });
    loadingOverlay.style.display = 'flex'; 

    setTimeout(() => {
      // ロード終了後、オーバーレイを消してタイムラインを新しく生成
      loadingOverlay.style.display = 'none';
      timeline.innerHTML = ''; 

      const totalPosts = 100;
      const targetIndex = Math.floor(Math.random() * 60) + 20; 

      for (let i = 0; i < totalPosts; i++) {
        if (i === targetIndex) {
          timeline.appendChild(createPost('TARGET'));
        } else {
          // ランダムでトラップを仕掛ける
          const rand = Math.random();
          if (rand < 0.05) {
            timeline.appendChild(createPost('FAKE')); // 5%の確率でフェイク
          } else if (rand < 0.15) {
            timeline.appendChild(createPost('AD'));   // 10%の確率で広告
          } else {
            timeline.appendChild(createPost('NORMAL')); // 残り85%は通常
          }
        }
      }
    }, 1500);

  }, 800); 
}

document.getElementById('header').onclick = setupGame;