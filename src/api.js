
// src/api.js
import axios from "axios";

// 환경변수에서 API 기본 URL 가져오기
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

// Board API 예시: Board 생성 함수
export const createBoard = async (boardIndex) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/boards/`, {
            board_index: boardIndex,
        });
        return response.data;
    } catch (error) {
        console.error("Error creating board:", error.response?.data || error.message);
        throw error;
    }
};

// Board 전체 조회
export const getBoards = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/boards/`);
        return response.data;
    } catch (error) {
        console.error("Error getting boards:", error.response?.data || error.message);
        throw error;
    }
};

// Post API 예시: 특정 Board에 Post 생성
export const createPostForBoard = async (boardId, postData) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/posts/board/${boardId}`,
            postData,
            { headers: { "Content-Type": "application/json" } }
        );
        return response.data;
    } catch (error) {
        console.error("Error creating post:", error.response?.data || error.message);
        throw error;
    }
};

export const updatePost = async (postId, updatedData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/posts/${postId}`, updatedData, {
            headers: { "Content-Type": "application/json" },
        });
        return response.data;
    } catch (error) {
        console.error("Error updating post:", error.response?.data || error.message);
        throw error;
    }
};
export const deletePost = async (postId) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/posts/${postId}`, {
            headers: { "Content-Type": "application/json" },
        });
        return response.data;
    } catch (error) {
        console.error("Error deleting post:", error.response?.data || error.message);
        throw error;
    }
};

// 다른 API 호출 함수들도 이와 같이 추가 가능합니다.
