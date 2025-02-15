import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import BoardTabs from "../components/BoardTabs";
import SearchBar from "../components/SearchBar";
import PostTable from "../components/PostTable";
import { BoardPost } from "../data/postData";
import WriteButton from "../components/WriteButton";
import SearchButton from "../components/SearchButton";
import BoardTitle from "../components/BoardTitle";

function BoardPage() {
  const { boardName } = useParams();
  const boardData = BoardPost.find((board) =>
    board.BoardIndex.toLowerCase().includes(boardName.toLowerCase())
  );

  const navigate = useNavigate();
  const goToMyPage = () => {
    navigate("/myPage");
  };

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
              <WriteButton />
            </div>
            <div>
              {boardData ? (
                // PostTable은 기존의 테이블 형식 내용을 그대로 사용합니다.
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
