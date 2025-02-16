// src/pages/PostDetailPage.jsx
import { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BoardContext } from "../contexts/BoardContext";

function ReadPostPage() {
  const { boardName, postId } = useParams();
  const { boards, setBoards } = useContext(BoardContext);
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

  const handleDelete = () => {
    if (window.confirm("정말로 이 게시글을 삭제하시겠습니까?")) {
      setBoards((prevBoards) =>
        prevBoards.map((board) => {
          if (board.BoardIndex.toLowerCase() === boardName.toLowerCase()) {
            return {
              ...board,
              posts: board.posts.filter((p) => String(p.id) !== postId),
            };
          }
          return board;
        })
      );
      // 삭제 후 해당 게시판 목록 페이지로 이동
      navigate(`/board/${boardName}`);
    }
  };

  const createdDate = new Date(post.time).toLocaleString();
  const modifiedDate = new Date(post.ModDate).toLocaleString();
  const showModifiedDate = post.ModDate && post.ModDate !== post.time;

  return (
    <div style={{ padding: "20px" }}>
      <h2>{post.title}</h2>
      <p>
        <strong>작성일:</strong> {createdDate}
        {showModifiedDate && (
          <>
            &nbsp;|&nbsp;<strong>수정일:</strong>
            {modifiedDate}
          </>
        )}{" "}
        &nbsp;|&nbsp; <strong>작성자:</strong> {post.user}
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
      <button
        onClick={() => navigate(`/board/${boardName}/post/${postId}/edit`)}
      >
        수정
      </button>
      <button onClick={handleDelete}>삭제</button>
    </div>
  );
}

export default ReadPostPage;
