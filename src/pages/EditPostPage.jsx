import { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BoardContext } from "../contexts/BoardContext";
import { updatePost } from "../services/postService";
import BoardTabs from "../components/BoardTabs";
import "../readStyles.css";

function EditPostPage() {
  const { boardName, postId } = useParams();
  const { boards, setBoards } = useContext(BoardContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // boards가 아직 로드되지 않은 경우
  const isLoading = !boards || boards.length === 0;

  // boards가 로드된 경우, boardName과 일치하는 게시글들만 필터링
  const filteredPosts = boards ? boards.filter((post) => post.board && post.board.toLowerCase() === boardName.toLowerCase()) : [];
  const boardNotFound = !isLoading && filteredPosts.length === 0;
  const foundPost = !isLoading && !boardNotFound ? filteredPosts.find((p) => String(p.id) === postId) : null;
  const postNotFound = !isLoading && !boardNotFound && !foundPost;

  // useEffect는 항상 호출되며 내부에서 조건에 따라 업데이트
  useEffect(() => {
    if (foundPost) {
      setTitle(foundPost.title);
      setContent(foundPost.content || "");
    }
  }, [foundPost]);

  // 조건에 따른 렌더링
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (boardNotFound) {
    return <div>게시판을 찾을 수 없습니다.</div>;
  }
  if (postNotFound) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }

  const goToMyPage = () => {
    navigate("/myPage/Profile");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const offset = new Date().getTimezoneOffset() * 60000;
    const modDate = new Date(Date.now() - offset).toISOString().replace("T", " ").replace(/\..*/, "");

    const updatedPost = {
      ...foundPost,
      title,
      content,
      ModDate: modDate,
    };

    try {
      const response = await updatePost(postId, updatedPost);
      // Context 업데이트: 해당 게시글만 업데이트
      setBoards((prevPosts) => prevPosts.map((p) => (String(p.id) === postId ? (response.data ? response.data : updatedPost) : p)));
      navigate(`/board/${boardName}/post/${postId}`);
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const createdDate = new Date(foundPost.time).toLocaleString();

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
            <div className="read_container">
              <form onSubmit={handleSubmit}>
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
                <div className="post_info">
                  <p>
                    <strong>작성일:</strong> {createdDate}
                    &nbsp;|&nbsp; <strong>작성자:</strong> {foundPost.user}
                  </p>
                </div>
                <textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "none",
                    borderRadius: "10px",
                    margin: "5px 0",
                    minHeight: "300px",
                    boxSizing: "border-box",
                    resize: "none",
                  }}
                />
                <div style={{ textAlign: "center", marginTop: "10px" }}>
                  <button className="cancle_button" type="button" onClick={() => navigate(-1)}>
                    취소
                  </button>
                  <button className="update_button" type="submit">
                    변경 저장
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

export default EditPostPage;
