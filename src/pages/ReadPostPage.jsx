// src/pages/PostDetailPage.jsx
import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BoardContext } from "../contexts/BoardContext";

function PostDetailPage() {
  const { boardName, postId } = useParams();
  const { boards } = useContext(BoardContext);
  const navigate = useNavigate();

  // 해당 게시판 데이터를 찾습니다.
  const boardData = boards.find(
    (board) => board.BoardIndex.toLowerCase() === boardName.toLowerCase()
  );

  if (!boardData) {
    return <div>게시판을 찾을 수 없습니다.</div>;
  }

  // 게시글 id는 숫자 혹은 문자열일 수 있으므로 문자열 비교
  const post = boardData.posts.find((p) => String(p.id) === postId);

  if (!post) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>{post.title}</h2>
      <p>
        <strong>작성일:</strong> {post.time} &nbsp;|&nbsp;{" "}
        <strong>작성자:</strong> {post.user}
      </p>
      {/* 만약 post 객체에 내용(content) 필드가 있다면 표시합니다. */}
      <div style={{ marginTop: "20px" }}>
        {post.content ? post.content : "게시글 내용이 없습니다."}
      </div>
      <button
        onClick={() => navigate(`/board/${boardName}`)}
        style={{ marginTop: "20px" }}
      >
        목록으로
      </button>
    </div>
  );
}

export default PostDetailPage;
