// 로그인, 마이페이지, 댓글 등의 기능은 추후에 더 공부하고 만들 예정.

import { useNavigate, useParams } from "react-router-dom";
import MyPageTab from "../components/MyPageTab";
import "../myPageStyles.css";

function MyPage() {
  const { indexName } = useParams();
  const navigate = useNavigate();
  const goToBoardPage = () => {
    navigate("/board/HN");
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
            <MyPageTab />
          </div>
          <div className="board-container">
            <div
              style={{
                fontSize: "2rem",
                color: "rgb(70, 70, 70)",
                fontWeight: "700",
                padding: "10px",
              }}
            >
              {indexName}
            </div>
            <div className="profile-container">
              <div className="profSection">
                <div className="profileImage">👤</div>
                <div className="name">hannah</div>
              </div>

              <div className="changeImage">프로필 사진 바꾸기</div>
              <div className="setMessage">상태메세지 설정하기</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyPage;
