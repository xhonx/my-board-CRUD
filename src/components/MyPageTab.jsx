import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function MyPageTab() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState("");

  // 컴포넌트가 마운트되거나 URL이 변경될 때마다, 현재 URL을 activeBoard 상태에 반영합니다.
  useEffect(() => {
    // location.pathname은 현재 URL 경로를 반환합니다.
    setActiveIndex(location.pathname);
  }, [location.pathname]);

  // 버튼 클릭 시 호출되는 핸들러 함수입니다.
  // route는 이동할 URL 경로를 의미합니다.
  const handleClick = (route) => {
    // 활성화된 버튼을 변경합니다.
    setActiveIndex(route);
    // 지정된 경로로 이동합니다.
    navigate(route);
  };

  return (
    <div className="nav-tabs">
      <button
        className={`boardindex-1 ${
          activeIndex === "/myPage/profile" ? "active" : ""
        }`}
        onClick={() => {
          handleClick("/myPage/profile");
        }}
      >
        Profile
      </button>
      <button
        className={`boardindex-2 ${
          activeIndex === "/myPage/history" ? "active" : ""
        }`}
        onClick={() => {
          handleClick("/myPage/history");
        }}
      >
        History
      </button>
    </div>
  );
}

export default MyPageTab;
