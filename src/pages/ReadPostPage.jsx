import { useContext, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BoardContext } from "../contexts/BoardContext";
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

  // 해당 게시판 데이터를 찾습니다.
  const boardData = boards.find(
    (board) => board.BoardIndex.toLowerCase() === boardName.toLowerCase()
  );

  if (!boardData) {
    return <div>게시판을 찾을 수 없습니다.</div>;
  }

  // 게시글 id는 숫자 혹은 문자열일 수 있으므로 문자열 비교
  const post = boardData.posts.find((p) => String(p.id) === postId);
  if (!post) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }

  const createdDate = new Date(post.time).toLocaleString();
  const modifiedDate = new Date(post.ModDate).toLocaleString();
  const showModifiedDate = post.ModDate && post.ModDate !== post.time;

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
                  onClick={() =>
                    navigate(`/board/${boardName}/post/${postId}/edit`)
                  }
                >
                  수정
                </button>
                {/* 수정: onClick을 화살표 함수로 감싸서 즉시 실행되지 않도록 함 */}
                <button
                  className="delete_button"
                  onClick={() => setModalOpen(true)}
                >
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
                        <button
                          className="modal_no_btn"
                          onClick={() => setModalOpen(false)}
                        >
                          아니오
                        </button>
                        <button
                          className="modal_yes_btn"
                          onClick={() => {
                            // boards 상태 업데이트: 해당 게시판에서 postId에 해당하는 게시글 삭제
                            setBoards((prevBoards) =>
                              prevBoards.map((board) => {
                                if (
                                  board.BoardIndex.toLowerCase() ===
                                  boardName.toLowerCase()
                                ) {
                                  return {
                                    ...board,
                                    posts: board.posts.filter(
                                      (p) => String(p.id) !== postId
                                    ),
                                  };
                                }
                                return board;
                              })
                            );
                            // 게시판 목록 페이지로 이동
                            navigate(`/board/${boardName}`);
                            // 모달 창 닫기
                            setModalOpen(false);
                          }}
                        >
                          예
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                <button
                  className="list_button"
                  onClick={() => navigate(`/board/${boardName}`)}
                >
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
