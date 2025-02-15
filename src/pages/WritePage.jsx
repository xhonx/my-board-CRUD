import { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BoardContext } from "../contexts/BoardContext";

import BoardTabs from "../components/BoardTabs";
import BoardTitle from "../components/BoardTitle";
import "../writeStyles.css";

function WritePostPage() {
  const { boardName } = useParams();
  const navigate = useNavigate();
  const { setBoards } = useContext(BoardContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const goToBoardPage = () => {
    navigate("/board/HN");
  };
  const goToBefore = () => {
    navigate(`/board/${boardName}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 여기서 폼 제출 로직을 구현합니다.
    // 제출 후, 해당 게시판 페이지로 이동
    const currentTime = new Date().toISOString().split("T")[0];
    const newPost = {
      id: Date.now(), // 간단한 고유 id (실제 DB에서는 다른 방법 사용)
      title,
      time: currentTime,
      user: "hannah", // 로그인 시스템이 있다면 실제 사용자 정보로 교체
    };
    // boards 상태 업데이트: 해당 게시판의 posts 배열에 새 글 추가
    setBoards((prevBoards) =>
      prevBoards.map((board) => {
        if (board.BoardIndex.toLowerCase() === boardName.toLowerCase()) {
          return {
            ...board,
            posts: [...board.posts, newPost],
          };
        }
        return board;
      })
    );

    // 글 작성 완료 후, 해당 게시판 페이지로 이동
    navigate(`/board/${boardName}`);
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
              {/* <h2>{boardName} 게시판 - 글 작성</h2> */}
              <form onSubmit={handleSubmit} className="write-page">
                <div>
                  {/* <label htmlFor="title"></label> */}
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
                  {/* <label htmlFor="content"></label> */}
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
                  <button className="postSubmit-Button" onClick={goToBefore}>
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
