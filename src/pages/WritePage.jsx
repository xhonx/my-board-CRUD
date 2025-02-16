// src/pages/WritePostPage.jsx
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createPost } from "../services/postService";
import BoardTabs from "../components/BoardTabs";
import BoardTitle from "../components/BoardTitle";
import "../writeStyles.css";

function WritePostPage() {
  const { boardName } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const goToMyPage = () => {
    navigate("/myPage/Profile");
  };
  const goToBefore = () => {
    navigate(`/board/${boardName}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const offset = new Date().getTimezoneOffset() * 60000;
    const createdDate = new Date(Date.now() - offset)
      .toISOString()
      .replace("T", " ")
      .replace(/\..*/, "");
    const newPost = {
      board: boardName, // 추가: 게시판 정보 포함
      // id는 보통 백엔드에서 생성하지만, 임시로 Date.now() 사용
      id: String(Date.now()),
      title,
      content,
      time: createdDate,
      user: "hannah",
    };
    console.log("New post:", newPost);

    try {
      await createPost(newPost);
      navigate(`/board/${boardName}`);
    } catch (error) {
      console.error("Error creating post:", error);
    }
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
            <div>
              <form onSubmit={handleSubmit} className="write-page">
                <div>
                  <input
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
                    style={{
                      width: "100%",
                      padding: "8px",
                      border: "none",
                      borderRadius: "10px",
                      margin: "5px 0",
                      minHeight: "300px",
                      boxSizing: "border-box",
                      resize: "none",
                      marginTop: "20px",
                    }}
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
                  <button className="return_Button" onClick={goToBefore}>
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
