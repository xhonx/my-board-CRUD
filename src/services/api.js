import axios from "axios";

// axios 인스턴스를 생성하여 API 기본 URL을 설정합니다.
// REACT_APP_API_URL 환경 변수를 사용하여 배포 환경에 따라 URL을 쉽게 변경할 수 있습니다.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://127.0.0.1:8000", //더미데이터로...
  // baseURL: import.meta.env.VITE_API_URL || "http://3.34.44.0:8000",
});

export default api;
