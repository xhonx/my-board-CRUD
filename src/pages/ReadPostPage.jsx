import { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BoardContext } from "../contexts/BoardContext";
import BoardTabs from "../components/BoardTabs";
import "../readStyles.css";

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

  // 게시글 id는 숫자 혹은 문자열일 수 있으므로 문자열 비교
  const post = boardData.posts.find((p) => String(p.id) === postId);
  if (!post) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }
  const createdDate = new Date(post.time).toLocaleString();
  const modifiedDate = new Date(post.ModDate).toLocaleString();
  const showModifiedDate = post.ModDate && post.ModDate !== post.time;

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
                      &nbsp;|&nbsp;<strong>수정일:</strong>
                      {modifiedDate}
                    </>
                  )}{" "}
                  &nbsp;|&nbsp; <strong>작성자:</strong> {post.user}
                </p>
              </div>

              {/* 만약 post 객체에 내용(content) 필드가 있다면 표시합니다. */}
              <div
                style={{
                  marginTop: "40px",
                }}
              >
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
    //  여기서부터 원래 코드
  );
}

export default ReadPostPage;
