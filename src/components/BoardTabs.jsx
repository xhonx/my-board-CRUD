import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

// BoardTabs 컴포넌트를 정의합니다.
function BoardTabs() {
  const navigate = useNavigate();

  // activeBoard 상태를 추가하여 현재 활성화된 버튼의 경로를 저장합니다.
  const [activeBoard, setActiveBoard] = useState("");

  // 컴포넌트가 마운트되거나 URL이 변경될 때마다, 현재 URL을 activeBoard 상태에 반영합니다.
  useEffect(() => {
    // location.pathname은 현재 URL 경로를 반환합니다.
    setActiveBoard(location.pathname);
  }, []);

  // 버튼 클릭 시 호출되는 핸들러 함수입니다.
  // route는 이동할 URL 경로를 의미합니다.
  const handleClick = (route) => {
    // 활성화된 버튼을 변경합니다.
    setActiveBoard(route);
    // 지정된 경로로 이동합니다.
    navigate(route);
  };

  return (
    // nav-tabs 클래스는 상단 탭 영역의 스타일을 적용합니다.
    <div className="nav-tabs">
      {/* # Free 버튼 */}
      <button
        // 기존 클래스(boardindex-1)는 그대로 유지하고, active 상태이면 "active" 클래스를 추가합니다.
        className={`boardindex-1 ${
          activeBoard === "/board/Free" ? "active" : ""
        }`}
        // 버튼 클릭 시 handleClick 함수를 호출하여 "/board/Free_board"로 이동하고 activeBoard를 설정합니다.
        onClick={() => {
          handleClick("/board/Free");
        }}
      >
        # Free
      </button>

      {/* # HN 버튼 */}
      <button
        className={`boardindex-2 ${
          activeBoard === "/board/HN" ? "active" : ""
        }`}
        onClick={() => {
          handleClick("/board/HN");
        }}
      >
        # HN
      </button>

      {/* # Front 버튼 */}
      <button
        className={`boardindex-3 ${
          activeBoard === "/board/Front" ? "active" : ""
        }`}
        onClick={() => {
          handleClick("/board/Front");
        }}
      >
        # Front
      </button>

      {/* # Back 버튼 */}
      <button
        className={`boardindex-4 ${
          activeBoard === "/board/Back" ? "active" : ""
        }`}
        onClick={() => {
          handleClick("/board/Back");
        }}
      >
        # Back
      </button>
    </div>
  );
}

// BoardTabs 컴포넌트를 내보냅니다.
export default BoardTabs;
