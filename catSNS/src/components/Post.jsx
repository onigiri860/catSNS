export default function Post({ post, onClick }) {
  return (
    <div
      onClick={() => onClick(post)}
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        margin: "5px",
        cursor: "pointer"
      }}
    >
      <p>{post.text}</p>
      <small>❤️ {post.likes}</small>
    </div>
  )
}