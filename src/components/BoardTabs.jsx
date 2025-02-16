import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

/*
-- 추가하고 싶은 기능 --
📌 게시판의 게시글 페이지에 가도 해당 게시판 인덱스 버튼 색이 유지되도록 하기

-- 필요한 것들 --
1. 현재 url의 위치
2. 
s
*/

function BoardTabs() {
  const navigate = useNavigate();
  const [activeBoard, setActiveBoard] = useState(""); //activeBoard는 현재 활성화된 경로(예: "/board/Free" 등)를 저장할 변수

  //이 훅은 컴포넌트가 마운트(화면에 처음 렌더링)될 때 한 번 실행됩니다.
  useEffect(() => {
    setActiveBoard(location.pathname);
  }, []);

  //이 함수는 버튼 클릭 시 호출되어, 이동할 경로(route)를 인자로 받습니다.
  const handleClick = (route) => {
    setActiveBoard(route); //전달받은 route 값을 activeBoard 상태로 업데이트합니다. 이를 통해 어떤 버튼(경로)이 활성화되었는지 표시할 수 있습니다.
    navigate(route); //리액트 라우터의 useNavigate 훅을 사용해 페이지 이동을 수행합니다. route 경로로 이동함으로써, URL과 페이지 내용이 변경됩니다.
  };

  return (
    <div className="nav-tabs">
      {/* # Free 버튼 */}
      <button
        className={`boardindex-1 ${
          activeBoard.startsWith("/board/Free") ? "active" : ""
        }`}
        onClick={() => {
          handleClick("/board/Free");
        }}
      >
        # Free
      </button>

      {/* # HN 버튼 */}
      <button
        className={`boardindex-2 ${
          activeBoard.startsWith("/board/HN") ? "active" : ""
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
          activeBoard.startsWith("/board/Front") ? "active" : ""
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
          activeBoard.startsWith("/board/Back") ? "active" : ""
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
