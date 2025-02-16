import PropTypes from "prop-types";
import { useNavigate, useParams } from "react-router-dom";

function PostTable({ posts }) {
  const navigate = useNavigate();
  const { boardName } = useParams();

  const handleRowClick = (postId) => {
    // boardName과 postId를 포함한 URL로 이동합니다.
    navigate(`/board/${boardName}/post/${postId}`);
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th>No</th>
          <th>Title</th>
          <th>Time</th>
          <th>ModDate</th>
          <th>User</th>
        </tr>
      </thead>
      <tbody>
        {posts && posts.length > 0 ? (
          posts.map((post, index) => (
            <tr
              key={post.id}
              onClick={() => handleRowClick(post.id)}
              style={{ cursor: "pointer" }} // 커서가 포인터로 변경되어 클릭 가능하다는 시각적 힌트를 줍니다.
            >
              <td>{index + 1}</td>
              <td>{post.title}</td>
              <td>{post.time}</td>
              <td>{post.ModDate}</td>
              <td>{post.user}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5">게시글이 없습니다.</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

PostTable.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
      user: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default PostTable;
