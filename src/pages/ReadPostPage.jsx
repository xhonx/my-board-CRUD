// src/pages/ReadPostPage.jsx
import { useContext, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BoardContext } from "../contexts/BoardContext";
import { deletePost } from "../services/postService";
import BoardTabs from "../components/BoardTabs";
import "../readStyles.css";

function ReadPostPage() {
  const { boardName, postId } = useParams();
  const { boards, setBoards } = useContext(BoardContext);
  const [modalOpen, setModalOpen] = useState(false);
  const modalBackground = useRef();

  const navigate = useNavigate();
  const goToMyPage = () => {
    navigate("/myPage/Profile");
  };

  // boards가 게시글 객체들의 배열라고 가정
  // 먼저, boardName과 일치하는 게시글들만 필터링합니다.
  const filteredPosts = boards.filter(
    (post) => post.board && post.board.toLowerCase() === boardName.toLowerCase()
  );

  if (filteredPosts.length === 0) {
    return <div>게시판을 찾을 수 없습니다.</div>;
  }

  // 이제 filteredPosts 배열에서 postId와 일치하는 게시글을 찾습니다.
  const post = filteredPosts.find((p) => String(p.id) === postId);
  if (!post) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }

  const createdDate = new Date(post.time).toLocaleString();
  const modifiedDate = post.ModDate ? new Date(post.ModDate).toLocaleString() : "";
  const showModifiedDate = post.ModDate && post.ModDate !== post.time;

  const handleDelete = async () => {
    try {
      await deletePost(postId);
      // 업데이트: Context 상태에서 해당 게시글 제거
      setBoards((prevPosts) => prevPosts.filter((p) => String(p.id) !== postId));
      navigate(`/board/${boardName}`);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div className="container-purple">
      <div className="container-white">
        <div className="top-right-links">
          <button className="notice-button">📢</button>
          <button className="alarm-button">🔔</button>
          <button className="mypage-button" onClick={goToMyPage}>
            MyPage
          </button>
          <button className="loginout-button">LogOut</button>
        </div>
        <div className="main-container">
          <div className="boardindex-container">
            <BoardTabs />
          </div>
          <div className="board-container">
            <div className="read_container">
              <h2
                style={{
                  fontSize: "1.8rem",
                  color: "rgb(70, 70, 70)",
                  fontWeight: "700",
                  marginTop: "5px",
                }}
              >
                {post.title}
              </h2>
              <div className="post_info">
                <p>
                  <strong>작성일 </strong> {createdDate}
                  {showModifiedDate && (
                    <>
                      &nbsp;&nbsp;|&nbsp; <strong>마지막수정일 </strong>
                      {modifiedDate}
                    </>
                  )}{" "}
                  &nbsp;|&nbsp; <strong>작성자 </strong> {post.user}
                </p>
              </div>
              <div
                style={{
                  marginTop: "30px",
                  maxWidth: "150%",
                  height: "320px",
                  minHeight: "200px",
                  padding: "20px",
                  overflow: "scroll",
                  textOverflow: "ellipsis",
                  whiteSpace: "pre",
                  border: "1px solid grey",
                  borderRadius: "10px",
                }}
              >
                {post.content ? post.content : "게시글 내용이 없습니다."}
              </div>
              <div className="button_container">
                <button
                  className="update_button"
                  onClick={() => navigate(`/board/${boardName}/post/${postId}/edit`)}
                >
                  수정
                </button>
                <button className="delete_button" onClick={() => setModalOpen(true)}>
                  삭제
                </button>
                {modalOpen && (
                  <div
                    className="modal-container"
                    ref={modalBackground}
                    onClick={(e) => {
                      if (e.target === modalBackground.current) {
                        setModalOpen(false);
                      }
                    }}
                  >
                    <div className="modal-content">
                      <h4 className="msg">이 게시글을 삭제하시겠습니까?</h4>
                      <div className="btns">
                        <button className="modal_no_btn" onClick={() => setModalOpen(false)}>
                          아니오
                        </button>
                        <button
                          className="modal_yes_btn"
                          onClick={async () => {
                            await handleDelete();
                            setModalOpen(false);
                          }}
                        >
                          예
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                <button className="list_button" onClick={() => navigate(`/board/${boardName}`)}>
                  목록으로
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReadPostPage;
