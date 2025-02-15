import { Routes, Route, Navigate } from "react-router-dom";
import BoardPage from "./pages/BoardPage";
import MyPage from "./pages/MyPage";
import "./styles.css";

function App() {
  return (
    // 원래 여기가 app-container
    <div className="app-container">
      <Routes>
        {/* 기본 페이지로 접근 시, "/board/자유" 페이지로 리다이렉트합니다. */}
        <Route path="/" element={<Navigate to="/board/Free" replace />} />
        {/* "/board/:boardName" 경로에 접근하면 해당 게시판 페이지를 렌더링합니다. */}
        <Route path="/board/:boardName" element={<BoardPage />} />

        <Route path="/myPage/:indexName" element={<MyPage />} />
      </Routes>
    </div>
  );
}

export default App;
