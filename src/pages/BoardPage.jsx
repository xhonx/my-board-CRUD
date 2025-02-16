import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { BoardContext } from "../contexts/BoardContext";
import BoardTabs from "../components/BoardTabs";
import SearchBar from "../components/SearchBar";
import PostTable from "../components/PostTable";
import WriteButton from "../components/WriteButton";
import SearchButton from "../components/SearchButton";
import BoardTitle from "../components/BoardTitle";

function BoardPage() {
  const { boardName } = useParams();
  const navigate = useNavigate();
  const { boards, loading } = useContext(BoardContext);

  // boardName을 소문자로 변환하여 BoardContext에서 일치하는 board 찾기
  const boardData = boards.find((board) =>
      board.board_index.toLowerCase() === boardName.toLowerCase()
  );

  const goToMyPage = () => {
    navigate("/myPage/Profile");
  };
  const goToWritePage = () => {
    navigate(`/board/${boardName}/write`);
  };

  if (loading) {
    return <div>로딩중...</div>;
  }

  return (
      <div className="container-purple">
        <div className="container-white">
          <div className="top-right-links">
            <button className="notice-button">📢</button>
            <button className="alarm-button">🔔</button>
            <button className="mypage-button" onClick={goToMyPage}>
              MyPage
            </button>
            <button className="loginout-button">LogOut</button>
          </div>
          <div className="main-container">
            <div className="boardindex-container">
              <BoardTabs />
            </div>
            <div className="board-container">
              <BoardTitle />
              <div className="search-and-write">
                <SearchBar />
                <SearchButton />
                <WriteButton onClick={goToWritePage} />
              </div>
              <div>
                {boardData ? (
                    // PostTable은 boardData.posts를 props로 전달받아 렌더링
                    <PostTable posts={boardData.posts} />
                ) : (
                    <div>해당 게시판을 찾을 수 없습니다.</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default BoardPage;
