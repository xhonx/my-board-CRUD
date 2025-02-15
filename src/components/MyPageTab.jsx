import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function MyPageTab() {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState("");

  useEffect(() => {
    setActiveIndex(location.pathname);
  }, [location.pathname]);

  const handleClick = (route) => {
    setActiveIndex(route);
    navigate(route);
  };

  return (
    <div className="nav-tabs">
      <button
        className={`boardindex-1 ${
          activeIndex === "/myPage/Profile" ? "active" : ""
        }`}
        onClick={() => {
          handleClick("/myPage/Profile");
        }}
      >
        Profile
      </button>
      <button
        className={`boardindex-2 ${
          activeIndex === "/myPage/History" ? "active" : ""
        }`}
        onClick={() => {
          handleClick("/myPage/History");
        }}
      >
        History
      </button>
    </div>
  );
}

export default MyPageTab;
