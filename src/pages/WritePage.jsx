import { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BoardContext } from "../contexts/BoardContext";
import BoardTabs from "../components/BoardTabs";
import BoardTitle from "../components/BoardTitle";
import "../writeStyles.css";
import { createPostForBoard } from "../api";

function WritePostPage() {
  const { boardName } = useParams();
  const navigate = useNavigate();
  const { boards, setBoards } = useContext(BoardContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // 현재 boardName과 일치하는 Board 데이터 찾기 (이때 boardName은 board.BoardIndex와 비교)
  const boardData = boards.find(
      (board) => board.board_index.toLowerCase() === boardName.toLowerCase()
  );

  const goToBoardPage = () => {
    navigate("/board/HN");
  };
  const goToBefore = () => {
    navigate(`/board/${boardName}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!boardData) {
      alert("게시판 정보를 찾을 수 없습니다.");
      return;
    }

    // 백엔드 API로 전달할 데이터 (time은 DB에서 자동 처리)
    const newPostData = {
      title,
      content,
      user: "hannah" // 실제 로그인 시스템이 있다면 실제 사용자 정보로 대체
    };

    try {
      // boardData.id 값을 사용하여 API 호출
      const createdPost = await createPostForBoard(boardData.id, newPostData);

      // API 호출이 성공하면, BoardContext의 boards 상태를 업데이트하여 새 글을 추가
      setBoards((prevBoards) =>
          prevBoards.map((board) => {
            if (board.board_index.toLowerCase() === boardName.toLowerCase()) {
              return {
                ...board,
                posts: [...board.posts, createdPost],
              };
            }
            return board;
          })
      );

      // 글 작성 완료 후 해당 게시판 페이지로 이동
      navigate(`/board/${boardName}`);
    } catch (error) {
      console.error("Failed to create post", error);
      alert("게시글 생성에 실패했습니다.");
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
              <BoardTitle />
              <div>
                <form onSubmit={handleSubmit} className="write-page">
                  <div>
                    <input
                        className="title"
                        id="title"
                        type="text"
                        placeholder="제목을 입력하세요"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div className="content-container">
                  <textarea
                      className="content"
                      id="content"
                      placeholder="내용을 입력하세요"
                      required
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                  ></textarea>
                  </div>
                  <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "5px",
                      }}
                  >
                    <button className="postSubmit-Button" type="button" onClick={goToBefore}>
                      이전
                    </button>
                    <button className="postSubmit-Button" type="submit">
                      완료
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default WritePostPage;
