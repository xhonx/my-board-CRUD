import { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BoardContext } from "../contexts/BoardContext";
import BoardTabs from "../components/BoardTabs";
import "../readStyles.css";

function EditPostPage() {
  const { boardName, postId } = useParams();
  const navigate = useNavigate();
  const { boards, setBoards } = useContext(BoardContext);

  const goToBoardPage = () => {
    navigate("/board/HN");
  };

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
  // const [ModDate, setModDate] = useState(post ? post.ModDate || "" : "");

  // boardData나 post가 없으면 에러 메시지를 반환합니다.
  if (!boardData) {
    return <div>게시판을 찾을 수 없습니다.</div>;
  }

  if (!post) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const offset = new Date().getTimezoneOffset() * 60000;
    const modDate = new Date(Date.now() - offset)
      .toISOString()
      .replace("T", " ")
      .replace(/\..*/, "");

    const updatedPost = {
      ...post,
      title,
      content,
      ModDate: modDate,
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
  const createdDate = new Date(post.time).toLocaleString();
  const modifiedDate = new Date(post.ModDate).toLocaleString();
  const showModifiedDate = post.ModDate && post.ModDate !== post.time;
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
            {/* 여기서부터 채우기 */}
            <div className="read_container">
              <form onSubmit={handleSubmit}>
                <div></div>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    height: "55px",
                    boxSizing: "border-box",
                    fontSize: "1.8rem",
                    color: "rgb(70, 70, 70)",
                    fontWeight: "700",
                    marginTop: "5px",
                    padding: "10px",
                    border: "none",
                    borderRadius: "10px",
                  }}
                />
              </form>
              <div className="post_info">
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
              </div>
              <div>
                {/* <h2>게시글 수정</h2> */}
                <form onSubmit={handleSubmit}>
                  <div>
                    <textarea
                      id="content"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      required
                      style={{
                        width: "100%",
                        padding: "8px",
                        border: "none",
                        borderRadius: "10px",
                        margin: "5px 0",
                        minHeight: "300px",
                        boxSizing: "border-box",
                        resize: "none",
                      }}
                    />
                  </div>
                  <div style={{ textAlign: "center", marginTop: "10px" }}>
                    <button
                      className="update_button"
                      type="button"
                      onClick={() => navigate(-1)}
                    >
                      취소
                    </button>
                    <button className="update_button" type="submit">
                      변경 저장
                    </button>
                    &nbsp;
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // 여기서부터 코드
  );
}

export default EditPostPage;
