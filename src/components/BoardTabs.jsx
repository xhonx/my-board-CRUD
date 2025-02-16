import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function BoardTabs() {
  const navigate = useNavigate();
  const [activeBoard, setActiveBoard] = useState("");

  useEffect(() => {
    setActiveBoard(location.pathname);
  }, []);

  const handleClick = (route) => {
    setActiveBoard(route);
    navigate(route);
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

export default BoardTabs;
