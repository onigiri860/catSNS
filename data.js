// ====== data.js ======
const DATA_POOL = {
  targets: [
    { name: "猫カフェ公式", handle: "@cat_cafe", text: "新作の猫用パフェ、限定10食です！🐾", iconSeed: "t_cat" },
    { name: "極秘リーク", handle: "@leaker_x", text: "明日、とんでもない発表があるらしい...", iconSeed: "t_leak" },
    { name: "お天気お姉さん", handle: "@weather_girl", text: "明日は東京で初雪の予報です。傘を忘れずに！❄️", iconSeed: "t_weather" },
    { name: "激辛マニア", handle: "@spicy_love", text: "この担々麺、今までで一番辛い。完食無理かも。", iconSeed: "t_spicy" },
    { name: "迷子センター", handle: "@lost_and_found", text: "【拡散希望】青い首輪の柴犬を探しています。", iconSeed: "t_dog" }
  ],
  userNames: ["たなか", "エンジニアK", "料理人", "おふとん大好き", "旅人", "匿名希望", "botくん"],
  userHandles: ["@user_tanaka", "@dev_k", "@cook_master", "@sleepy", "@traveler", "@unknown", "@robot_01"],
  subjects: ["きょうのらんち", "さいきんのえいあい", "このげえむ", "うちのねこ", "しんさくのえいが", "あしたのてんき", "しごと"],
  actions: ["まじでやばい。", "さいこうすぎる！", "びみょうかもしれない…", "なぞすぎるww", "いやされる〜", "たのしみ！"],
  hashtags: ["#にちじょう", "#おすすめ", "#たすけて", "#さいこう", "#しらんけど", "#くさ"]
};

// ★追加：異界言語の辞書
const ALIEN_DICTIONARY = {
  // ① 単語ごとの変換（名詞などをヒエログリフに）
  words: {
    "猫": "<img src='fig/cat1.png' class='alien-img'>", 
    "犬": "𓃡", "柴犬": "𓃡", "雪": "𓁢", "初雪": "𓁢",
    "傘": "𓆉", "天気": "𓄿", "辛い": "𓆣", "最高": "𓀠", "ヤバい": "𓀿",
    "ランチ": "𓃟", "映画": "𓆤", "仕事": "𓀡", "日常": "𓇳", "明日": "𓇳"
  },
  // ② 1文字ごとの変換（ひらがななどを別記号に）
  chars: {
    "あ": "<img src='fig/ant1.png' class='alien-img'>", 
    "い": "<img src='fig/bird1.png' class='alien-img'>", 
    "う": "<img src='fig/book1.png' class='alien-img'>", 
    "え": "<img src='fig/bull1.png' class='alien-img'>", 
    "お": "<img src='fig/butterfly1.png' class='alien-img'>", 
    "か": "<img src='fig/camel1.png' class='alien-img'>", 
    "き": "<img src='fig/cat1.png' class='alien-img'>", 
    "く": "<img src='fig/cat2.png' class='alien-img'>", 
    "け": "<img src='fig/cat3.png' class='alien-img'>", 
    "こ": "<img src='fig/cat4.png' class='alien-img'>", 
    "さ": "<img src='fig/dog1.png' class='alien-img'>", 
    "し": "<img src='fig/dog1.png' class='alien-img'>", 
    "す": "<img src='fig/dolphin1.png' class='alien-img'>", 
    "せ": "<img src='fig/fish1.png' class='alien-img'>", 
    "そ": "<img src='fig/frog1.png' class='alien-img'>", 
    "た": "<img src='fig/giraffe1.png' class='alien-img'>", 
    "ち": "<img src='fig/golira1.png' class='alien-img'>", 
    "つ": "<img src='fig/human1.png' class='alien-img'>", 
    "て": "<img src='fig/mag1.png' class='alien-img'>", 
    "と": "<img src='fig/magnet1.png' class='alien-img'>", 
    "な": "<img src='fig/magnet2.png' class='alien-img'>", 
    "に": "<img src='fig/monstar1.png' class='alien-img'>", 
    "ぬ": "<img src='fig/monstar2.png' class='alien-img'>", 
    "ね": "<img src='fig/monstar3.png' class='alien-img'>", 
    "の": "<img src='fig/muscle1.png' class='alien-img'>", 
    "は": "<img src='fig/nats1.png' class='alien-img'>", 
    "ひ": "<img src='fig/pengin1.png' class='alien-img'>", 
    "ふ": "<img src='fig/pig1.png' class='alien-img'>", 
    "へ": "<img src='fig/pipe1.png' class='alien-img'>", 
    "ほ": "<img src='fig/rabbit1.png' class='alien-img'>", 
    "ま": "<img src='fig/squirrel1.png' class='alien-img'>", 
    "み": "<img src='fig/star1.png' class='alien-img'>", 
    "む": "<img src='fig/stick1.png' class='alien-img'>", 
    "め": "<img src='fig/tie1.png' class='alien-img'>", 
    "も": "<img src='fig/tie2.png' class='alien-img'>", 
    "や": "<img src='fig/turtle1.png' class='alien-img'>", 
    "ゆ": "<img src='fig/cat1.png' class='alien-img'>", 
    "よ": "<img src='fig/cat1.png' class='alien-img'>", 
    "ら": "<img src='fig/cat1.png' class='alien-img'>", 
    "り": "<img src='fig/cat1.png' class='alien-img'>", 
    "る": "<img src='fig/cat1.png' class='alien-img'>", 
    "れ": "<img src='fig/cat1.png' class='alien-img'>", 
    "ろ": "<img src='fig/cat1.png' class='alien-img'>", 
    "わ": "<img src='fig/cat1.png' class='alien-img'>", 
    "を": "<img src='fig/cat1.png' class='alien-img'>", 
    "ん": "<img src='fig/cat1.png' class='alien-img'>", 
  }
};