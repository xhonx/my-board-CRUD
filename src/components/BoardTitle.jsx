import { useParams } from "react-router-dom";

function BoardTitle() {
  const { boardName } = useParams();
  return (
    <div
      style={{
        fontSize: "2rem",
        color: "rgb(90, 90, 90)",
        fontWeight: "700",
        padding: "10px",
      }}
    >
      {boardName} Board
    </div>
  );
}

export default BoardTitle;
