// src/pages/BoardPage.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchPosts } from "../services/postService";
import BoardTabs from "../components/BoardTabs";
import SearchBar from "../components/SearchBar";
import PostTable from "../components/PostTable";
import WriteButton from "../components/WriteButton";
import SearchButton from "../components/SearchButton";
import BoardTitle from "../components/BoardTitle";

function BoardPage() {
  const { boardName } = useParams();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const goToMyPage = () => {
    navigate("/myPage/Profile");
  };

  const goToWritePage = () => {
    navigate(`/board/${boardName}/write`);
  };

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchPosts(boardName);
        setPosts(data);
      } catch (err) {
        console.error("Error loading posts:", err);
        setError("게시글을 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };
    loadPosts();
  }, [boardName]);

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
            <div className="table_container">
              {loading ? (
                <div>Loading...</div>
              ) : error ? (
                <div>{error}</div>
              ) : (
                <PostTable posts={posts} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BoardPage;
