import { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BoardContext } from "../contexts/BoardContext";
import BoardTabs from "../components/BoardTabs";
import "../readStyles.css";
import { deletePost } from "../api"; // API 함수 임포트

function ReadPostPage() {
  const { boardName, postId } = useParams();
  const { boards, setBoards } = useContext(BoardContext);
  const navigate = useNavigate();
  const goToBoardPage = () => {
    navigate("/board/HN");
  };

  // 해당 게시판 데이터를 찾습니다.
  const boardData = boards.find(
      (board) => board.BoardIndex.toLowerCase() === boardName.toLowerCase()
  );

  if (!boardData) {
    return <div>게시판을 찾을 수 없습니다.</div>;
  }

  // 게시글 id는 문자열로 비교
  const post = boardData.posts.find((p) => String(p.id) === postId);
  if (!post) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }

  const createdDate = new Date(post.time).toLocaleString();
  const modifiedDate = post.ModDate ? new Date(post.ModDate).toLocaleString() : null;
  const showModifiedDate = post.ModDate && post.ModDate !== post.time;

  const handleDelete = async () => {
    if (window.confirm("정말로 이 게시글을 삭제하시겠습니까?")) {
      try {
        // 백엔드 API 호출하여 게시글 삭제
        await deletePost(postId);
        // Context 업데이트: 해당 게시글 삭제
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
        // 삭제 후 해당 게시판 페이지로 이동
        navigate(`/board/${boardName}`);
      } catch (error) {
        console.error("Failed to delete post:", error);
      }
    }
  };

  return (
      <div className="container-purple">
        <div className="container-white">
          <div className="top-right-links">
            <button className="notice-button">📢</button>
            <button className="alarm-button">🔔</button>
            <button className="mypage-button" onClick={goToBoardPage}>
              BoardPage
            </button>
            <button className="loginout-button">LogOut</button>
          </div>
          <div className="main-container">
            <div className="boardindex-container">
              <BoardTabs />
            </div>
            <div className="board-container">
              <div className="read_container">
                <h2
                    style={{
                      fontSize: "1.8rem",
                      color: "rgb(70, 70, 70)",
                      fontWeight: "700",
                      marginTop: "5px",
                    }}
                >
                  {post.title}
                </h2>
                <div className="post_info">
                  <p>
                    <strong>작성일:</strong> {createdDate}
                    {showModifiedDate && (
                        <>
                          &nbsp;|&nbsp;<strong>수정일:</strong> {modifiedDate}
                        </>
                    )}
                    &nbsp;|&nbsp; <strong>작성자:</strong> {post.user}
                  </p>
                </div>
                <div style={{ marginTop: "40px" }}>
                  {post.content ? post.content : "게시글 내용이 없습니다."}
                </div>
                <div className="button_container">
                  <button
                      className="update_button"
                      onClick={() =>
                          navigate(`/board/${boardName}/post/${postId}/edit`)
                      }
                  >
                    수정
                  </button>
                  <button className="delete_button" onClick={handleDelete}>
                    삭제
                  </button>
                  <button
                      className="list_button"
                      onClick={() => navigate(`/board/${boardName}`)}
                  >
                    목록으로
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default ReadPostPage;
