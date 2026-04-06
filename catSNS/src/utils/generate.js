export function rand(min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

const texts = [
  "今日やばい",
  "おすすめ流れてきた",
  "これ気になる",
  "意味わからん",
  "神すぎる",
  "草"
]

export function generatePost(id) {
  return {
    id,
    text: texts[rand(0, texts.length)],
    likes: rand(0, 1000),
    isTarget: false
  }
}

export function createTarget() {
  const post = generatePost("target")
  post.isTarget = true
  return post
}

export function generateFeed(target) {
  const feed = []

  for (let i = 0; i < 50; i++) {
    feed.push(generatePost(i))
  }

  const index = rand(10, 40)
  feed.splice(index, 0, target)

  return feed
}