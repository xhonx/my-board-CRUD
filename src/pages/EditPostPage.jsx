// src/pages/EditPostPage.jsx
import { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BoardContext } from "../contexts/BoardContext";

function EditPostPage() {
  const { boardName, postId } = useParams();
  const navigate = useNavigate();
  const { boards, setBoards } = useContext(BoardContext);

  // 조건문 이전에 boardData와 post를 계산합니다.
  const boardData = boards.find(
    (board) => board.BoardIndex.toLowerCase() === boardName.toLowerCase()
  );

  // boardData가 없으면 post는 null
  const post = boardData
    ? boardData.posts.find((p) => String(p.id) === postId)
    : null;

  // 모든 훅은 조건에 상관없이 호출합니다.
  const [title, setTitle] = useState(post ? post.title : "");
  const [content, setContent] = useState(post ? post.content || "" : "");

  // boardData나 post가 없으면 에러 메시지를 반환합니다.
  if (!boardData) {
    return <div>게시판을 찾을 수 없습니다.</div>;
  }

  if (!post) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedPost = {
      ...post,
      title,
      content,
    };

    // Context 업데이트: 해당 게시글 수정
    setBoards((prevBoards) =>
      prevBoards.map((board) => {
        if (board.BoardIndex.toLowerCase() === boardName.toLowerCase()) {
          return {
            ...board,
            posts: board.posts.map((p) =>
              String(p.id) === postId ? updatedPost : p
            ),
          };
        }
        return board;
      })
    );

    // 수정 완료 후, 상세 페이지로 이동
    navigate(`/board/${boardName}/post/${postId}`);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>게시글 수정</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">제목: </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", margin: "5px 0" }}
          />
        </div>
        <div>
          <label htmlFor="content">내용: </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "8px",
              margin: "5px 0",
              minHeight: "150px",
              boxSizing: "border-box",
            }}
          />
        </div>
        <div style={{ textAlign: "center", marginTop: "10px" }}>
          <button type="submit">변경 저장</button>
          &nbsp;
          <button type="button" onClick={() => navigate(-1)}>
            취소
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditPostPage;
