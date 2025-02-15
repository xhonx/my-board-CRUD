import MyPageTab from "../components/MyPageTab";
import BoardTitle from "../components/BoardTitle";

function MyPage() {
  return (
    <div className="container-purple">
      <div className="container-white">
        <div className="top-right-links">
          <button className="notice-button">📢</button>
          <button className="alarm-button">🔔</button>
          <button className="mypage-button">MyPage</button>
          <button className="loginout-button">LogOut</button>
        </div>
        <div className="main-container">
          <div className="boardindex-container">
            <MyPageTab />
          </div>
          <div className="board-container">
            <BoardTitle />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyPage;
