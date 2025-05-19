import api from "./api";

/**
 * 특정 게시판의 게시글 목록을 가져옵니다.
 * @param {string} board - 게시판 이름: 백엔드라우터 상에서는 board_index (예: "Free", "HN", "Front", "Back")
 * @returns {Promise<Array>} 게시글 배열
 */
export const fetchPosts = async (board) => {
  try {
    const response = await api.get(`/posts/board/${board}`); //get 요청, /posts 엔드포인트 호출
    //  [이게 404에러났던 기존 코드..]   const response = await api.get("/posts", { params: { board_index: board } });
    // params 객체 사용 -> 현재 url (어떤 게시판인지) 변환 ->
    return response.data; //해당 게시판의 게시글 정보들 반환
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

/**
 * 특정 게시글의 상세 정보를 가져옵니다.
 * @param {string} board - 게시판 이름
 * @param {string|number} postId - 게시글 아이디
 * @returns {Promise<Object>} 게시글 데이터
 */
export const fetchPost = async (postId) => {
  try {
    const response = await api.get(`/posts/${postId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching post:", error);
    throw error;
  }
};

/**
 * 새 게시글을 생성합니다.
 * @param {Object} postData - 새 게시글 데이터 (예: { board, title, content, user, ... })
 * @returns {Promise<Object>} 생성된 게시글 데이터
 */
export const createPost = async (postData) => {
  // 1) PostCreate 스키마에 맞춰 payload를 만듭니다
  const payload = {
    // 페이로드가 ㅅㅂ 뭐임;;; 이거땜에 진짜ㅣ;;;;ㅣ
    title: postData.title,
    content: postData.content,
    user: postData.user, // 이 필수!
  };
  try {
    console.log("보내는 payload:", {
      title: postData.title,
      content: postData.content,
    });
    const response = await api.post(`/posts/board/${postData.board}`, payload);
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

/**
 * 기존 게시글을 수정합니다.
 * @param {string|number} postId - 수정할 게시글의 아이디
 * @param {Object} postData - 업데이트할 게시글 데이터
 * @returns {Promise<Object>} 수정된 게시글 데이터
 */
export const updatePost = async (postId, postData) => {
  try {
    const response = await api.put(`/posts/${postId}`, postData);
    return response.data;
  } catch (error) {
    console.error("Error updating post:", error);
    throw error;
  }
};

/**
 * 게시글을 삭제합니다.
 * @param {string|number} postId - 삭제할 게시글의 아이디
 * @returns {Promise<Object>} 삭제 결과 데이터
 */
export const deletePost = async (postId) => {
  try {
    const response = await api.delete(`/posts/${postId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
};
