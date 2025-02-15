import PropTypes from "prop-types";

function PostTable({ posts }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>No</th>
          <th>Title</th>
          <th>Time</th>
          <th>User</th>
        </tr>
      </thead>
      <tbody>
        {/* 조건부 랜더링 - 
        1. posts 배열이 존재하고, 그 배열의 길이가 0보다 큰지 확인
        2. True: 
        
        */}
        {posts && posts.length > 0 ? (
          // 각 게시글의 객체(post), 그 객체의 인덱스(index)
          posts.map((post, index) => (
            // 데이터를 한 행으로 표현
            <tr key={post.id}>
              <td>{index + 1}</td>
              <td>{post.title}</td>
              <td>{post.time}</td>
              <td>{post.user}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4">게시글이 없습니다.</td>
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
