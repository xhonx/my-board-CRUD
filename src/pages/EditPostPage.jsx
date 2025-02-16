// src/pages/EditPostPage.jsx
import { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BoardContext } from "../contexts/BoardContext";
import { updatePost } from "../api";

function EditPostPage() {
  const { boardName, postId } = useParams();
  const navigate = useNavigate();
  const { boards, setBoards } = useContext(BoardContext);

  const boardData = boards.find(
      (board) => board.board_index.toLowerCase() === boardName.toLowerCase()
  );

  const post = boardData
      ? boardData.posts.find((p) => String(p.id) === postId)
      : null;

  // 초기값 설정: 수정하려는 게시글의 제목, 내용을 미리 채워둡니다.
  const [title, setTitle] = useState(post ? post.title : "");
  const [content, setContent] = useState(post ? post.content || "" : "");

  if (!boardData) {
    return <div>게시판을 찾을 수 없습니다.</div>;
  }

  if (!post) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 수정 시각: 백엔드에서 onupdate로 자동 처리할 수도 있지만,
    // 필요 시 클라이언트에서 보내려면 아래와 같이 할 수 있습니다.
    const modDate = new Date().toISOString().replace("T", " ").replace(/\..*/, "");

    const updatedPostData = {
      title,
      content,
      // 예시로 ModDate를 포함한다면, 백엔드에서 이를 무시할 수도 있습니다.
      ModDate: modDate,
    };

    try {
      // 백엔드 API 호출하여 수정 요청
      const updatedPost = await updatePost(postId, updatedPostData);

      // 수정된 게시글 데이터를 Context에도 반영합니다.
      setBoards((prevBoards) =>
          prevBoards.map((board) => {
            if (board.board_index.toLowerCase() === boardName.toLowerCase()) {
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

      // 수정 완료 후 상세 페이지로 이동
      navigate(`/board/${boardName}/post/${postId}`);
    } catch (error) {
      console.error("Error updating post:", error);
      // 필요에 따라 사용자에게 에러 메시지 표시
    }
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
