import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import BoardContext from "./BoardContextValue";

export const BoardProvider = ({ children }) => {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/boards/`);
        setBoards(response.data);
      } catch (error) {
        console.error("Error fetching boards:", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBoards();
  }, [API_BASE_URL]);

  return (
      <BoardContext.Provider value={{ boards, setBoards, loading }}>
        {children}
      </BoardContext.Provider>
  );
};

BoardProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
