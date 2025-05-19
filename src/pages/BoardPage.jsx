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
  const { boardName } = useParams(); // url /:BoardName 에서 파라미터 추출
  const navigate = useNavigate(); // useNavigate 훅으로 페이지 이동시키는 함수(navigate) 생성
  const [posts, setPosts] = useState([]); // 게시글 데이터를 저장할 상태를 빈 배열로 초기화
  const [loading, setLoading] = useState(true); // 로딩 여부를 관리할 상태 초기화, 초기값은 true
  const [error, setError] = useState(null); // 에러

  // navigate 함수: 해당 경로로 이동시킨다. (버튼 onClick으로 함수 호출)
  const goToMyPage = () => {
    navigate("/myPage/Profile");
  };
  const goToWritePage = () => {
    navigate(`/board/${boardName}/write`); // useParams로 추출했던 ${현재 게시판} 의 글쓰기 페이지로 이동
  };

  useEffect(() => {
    const loadPosts = async () => {
      // 비동기로 처리한다
      try {
        const data = await fetchPosts(boardName); // fetchPosts, 특정 게시판의 게시글 목록 가져옴. (API 함수 호출)
        setPosts(data);
      } catch (err) {
        console.error("Error loading posts:", err);
        setError("게시글을 불러오는데 실패했습니다.");
      } finally {
        setLoading(false); // 기본값은 true 였다가 데이터 처리 완료 후 로딩상태 제거
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
            <div className="table_container">{loading ? <div>Loading...</div> : error ? <div>{error}</div> : <PostTable posts={posts} />}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BoardPage;
