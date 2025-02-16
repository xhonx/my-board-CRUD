import { Routes, Route, Navigate } from "react-router-dom";
import BoardPage from "./pages/BoardPage";
import ReadPostPage from "./pages/ReadPostPage";
import EditPostPage from "./pages/EditPostPage";
import MyPage from "./pages/MyPage";
import WritePage from "./pages/WritePage";
import { BoardProvider } from "./contexts/BoardContext";
import "./styles.css";

function App() {
  return (
    <BoardProvider>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Navigate to="/board/HN" replace />} />
          <Route path="/board/:boardName" element={<BoardPage />}></Route>
          <Route path="/board/:boardName/write" element={<WritePage />} />
          <Route
            path="/board/:boardName/post/:postId"
            element={<ReadPostPage />}
          />
          <Route
            path="/board/:boardName/post/:postId/edit"
            element={<EditPostPage />}
          />
          <Route path="/myPage/:indexName" element={<MyPage />} />
        </Routes>
      </div>
    </BoardProvider>
  );
}

export default App;
