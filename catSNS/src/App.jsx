import { useEffect, useState } from "react"
import Post from "./components/Post"
import { createTarget, generateFeed } from "./utils/generate"

export default function App() {
  const [phase, setPhase] = useState("show")
  const [target, setTarget] = useState(null)
  const [feed, setFeed] = useState([])
  const [result, setResult] = useState("")

  useEffect(() => {
    startGame()
  }, [])

  function startGame() {
    const t = createTarget()
    setTarget(t)
    setPhase("show")

    setTimeout(() => {
      setFeed(generateFeed(t))
      setPhase("play")
    }, 1000)
  }

  function handleClick(post) {
    if (phase !== "play") return

    if (post.isTarget) {
      setResult("正解！🎉")
    } else {
      setResult("違う！😢")
    }

    setPhase("result")
  }

  return (
    <div style={{ maxWidth: 400, margin: "auto" }}>
      <h1>SNS 探索ゲーム</h1>

      {phase === "show" && target && (
        <>
          <p>この投稿を覚えて！</p>
          <Post post={target} onClick={() => {}} />
        </>
      )}

      {phase === "play" && (
        <div style={{ height: "500px", overflowY: "scroll", border: "1px solid black" }}>
          {feed.map((p) => (
            <Post key={p.id} post={p} onClick={handleClick} />
          ))}
        </div>
      )}

      {phase === "result" && (
        <>
          <h2>{result}</h2>
          <button onClick={startGame}>もう一回</button>
        </>
      )}
    </div>
  )
}